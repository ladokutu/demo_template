import { NextResponse } from 'next/server';
import pool from '@/src/lib/db';

async function ensureMessagesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      perusahaan VARCHAR(255) DEFAULT NULL,
      layanan VARCHAR(255) DEFAULT NULL,
      budget VARCHAR(100) DEFAULT NULL,
      pesan TEXT NOT NULL,
      is_read TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
}

// PATCH — mark message as read
export async function PATCH(request, { params }) {
  try {
    await ensureMessagesTable();
    const { id } = await params;
    await pool.query('UPDATE messages SET is_read = 1 WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Pesan ditandai sudah dibaca.' });
  } catch (error) {
    console.error('PATCH /api/messages/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE — delete a message
export async function DELETE(request, { params }) {
  try {
    await ensureMessagesTable();
    const { id } = await params;
    await pool.query('DELETE FROM messages WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Pesan dihapus.' });
  } catch (error) {
    console.error('DELETE /api/messages/[id] error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}