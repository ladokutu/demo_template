import { NextResponse } from 'next/server';
import pool from '@/src/lib/db';
import { sendTelegramMessage } from '@/src/lib/telegram';

async function ensureMessagesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telepon VARCHAR(50) DEFAULT NULL,
      perusahaan VARCHAR(255) DEFAULT NULL,
      layanan VARCHAR(255) DEFAULT NULL,
      budget VARCHAR(100) DEFAULT NULL,
      pesan TEXT NOT NULL,
      is_read TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  // Add telepon column if missing (for existing tables)
  try {
    await pool.query(`ALTER TABLE messages ADD COLUMN telepon VARCHAR(50) DEFAULT NULL AFTER email`);
  } catch (e) {
    // Column already exists, ignore error
  }
}

// GET — list all messages (admin)
export async function GET(request) {
  try {
    await ensureMessagesTable();
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unread') === '1';

    let query = 'SELECT * FROM messages';
    if (unreadOnly) query += ' WHERE is_read = 0';
    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query);

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('GET /api/messages error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST — submit a new message (contact form)
export async function POST(request) {
  try {
    await ensureMessagesTable();
    const body = await request.json();
    const { nama, email, telepon, perusahaan, layanan, budget, pesan } = body;

    // Validation
    if (!nama || !email || !pesan) {
      return NextResponse.json(
        { success: false, message: 'Nama, email, dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO messages (nama, email, telepon, perusahaan, layanan, budget, pesan)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nama, email, telepon || null, perusahaan || null, layanan || null, budget || null, pesan]
    );

    // Send Telegram notification
    const telegramText = `📩 <b>Pesan Baru dari Website</b>\n\n` +
      `👤 <b>Nama:</b> ${nama}\n` +
      `📧 <b>Email:</b> ${email}\n` +
      (telepon ? `📞 <b>Telepon:</b> ${telepon}\n` : '') +
      (perusahaan ? `🏢 <b>Perusahaan:</b> ${perusahaan}\n` : '') +
      (layanan ? `💼 <b>Layanan:</b> ${layanan}\n` : '') +
      (budget ? `💰 <b>Budget:</b> ${budget}\n` : '') +
      `\n💬 <b>Pesan:</b>\n${pesan}`;

    sendTelegramMessage(telegramText);

    return NextResponse.json({
      success: true,
      message: 'Pesan berhasil dikirim!',
      id: result.insertId,
    });
  } catch (error) {
    console.error('POST /api/messages error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}