import { NextResponse } from 'next/server';
import pool from '../../../src/lib/db.js';
import { runMigration } from '../../../src/lib/migrate.js';
import { generateToken } from '../../../src/lib/auth.js';
import crypto from 'crypto';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);

    let rows = [];
    try {
      const [result] = await pool.query(
        'SELECT id, email, name FROM admin_users WHERE email = ? AND password_hash = ? AND is_active = 1',
        [email, passwordHash]
      );
      rows = result;
    } catch (qErr) {
      if (qErr.code === 'ER_NO_SUCH_TABLE' || qErr.errno === 1146) {
        // Auto-migrate when table doesn't exist
        try {
          await runMigration();
          // Retry login after migration
          const [retryResult] = await pool.query(
            'SELECT id, email, name FROM admin_users WHERE email = ? AND password_hash = ? AND is_active = 1',
            [email, passwordHash]
          );
          if (retryResult.length > 0) {
            const user = retryResult[0];
            const token = generateToken(user);
            return NextResponse.json({
              success: true,
              token,
              user: { id: user.id, email: user.email, name: user.name },
            });
          }
        } catch (migErr) {
          console.error('Auto-migration failed:', migErr);
          return NextResponse.json({ success: false, error: 'Gagal auto-migrate: ' + migErr.message }, { status: 503 });
        }
        return NextResponse.json({ success: false, error: 'Database belum di-migrate.' }, { status: 503 });
      }
      throw qErr;
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const user = rows[0];
    const token = generateToken(user);

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
