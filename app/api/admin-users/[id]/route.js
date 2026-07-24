import { NextResponse } from 'next/server';
import pool from '../../../../src/lib/db.js';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Prevent deleting the last admin
    const [countResult] = await pool.query('SELECT COUNT(*) as count FROM admin_users WHERE is_active = 1').catch(e => { if (e.errno === 1146) return [[{count:0}]]; throw e; });
    const [current] = await pool.query('SELECT is_active FROM admin_users WHERE id = ?', [id]).catch(e => { if (e.errno === 1146) return [[]]; throw e; });
    
    if (current.length === 0) {
      return NextResponse.json({ success: false, error: 'Admin user tidak ditemukan' }, { status: 404 });
    }
    
    if (current[0].is_active && countResult[0].count <= 1) {
      return NextResponse.json({ success: false, error: 'Tidak bisa menghapus admin terakhir yang aktif' }, { status: 400 });
    }

    await pool.query('DELETE FROM admin_users WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Admin user berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const updates = [];
    const values = [];
    
    if (body.name !== undefined) { updates.push('name = ?'); values.push(body.name); }
    if (body.email !== undefined) { updates.push('email = ?'); values.push(body.email); }
    if (body.is_active !== undefined) { updates.push('is_active = ?'); values.push(body.is_active ? 1 : 0); }
    if (body.password) {
      const crypto = await import('crypto');
      const hash = crypto.createHash('sha256').update(body.password).digest('hex');
      updates.push('password_hash = ?');
      values.push(hash);
    }
    
    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: 'Tidak ada data yang diupdate' }, { status: 400 });
    }
    
    values.push(id);
    await pool.query(`UPDATE admin_users SET ${updates.join(', ')} WHERE id = ?`, values);
    
    return NextResponse.json({ success: true, message: 'Admin user berhasil diupdate' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ success: false, error: 'Email sudah terdaftar' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}