import { NextResponse } from 'next/server';
import pool from '../../../src/lib/db.js';
import crypto from 'crypto';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// GET all admin users
export async function GET() {
  try {
    let rows = [];
    try {
      const [result] = await pool.query(
        'SELECT id, email, name, is_active, created_at FROM admin_users ORDER BY id'
      );
      rows = result;
    } catch (qErr) {
      if (qErr.code === 'ER_NO_SUCH_TABLE' || qErr.errno === 1146) {
        return NextResponse.json({ success: true, data: [], message: 'Belum di-migrate' });
      }
      throw qErr;
    }
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST new admin user
export async function POST(request) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email dan password wajib diisi' }, { status: 400 });
    }
    const passwordHash = hashPassword(password);
    let result;
    try {
      const [insertResult] = await pool.query(
        'INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)',
        [email, passwordHash, name || 'Admin']
      );
      result = insertResult;
    } catch (qErr) {
      if (qErr.code === 'ER_NO_SUCH_TABLE' || qErr.errno === 1146) {
        return NextResponse.json({ success: false, error: 'Database belum di-migrate. Jalankan migration di admin panel.' }, { status: 503 });
      }
      throw qErr;
    }
    return NextResponse.json({ success: true, id: result.insertId, message: 'Admin user berhasil ditambahkan' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ success: false, error: 'Email sudah terdaftar' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}