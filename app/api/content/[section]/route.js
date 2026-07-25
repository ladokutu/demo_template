import { NextResponse } from 'next/server';
import pool from '@/src/lib/db';
import { verifyToken } from '@/src/lib/auth';

const TABLE_MAP = {
  services: 'services',
  process_steps: 'process_steps',
  portfolio_items: 'portfolio_items',
  stats: 'stats',
  testimonials: 'testimonials',
  partners: 'partners',
  team_members: 'team_members',
  company_values: 'company_values',
  nav_links: 'nav_links',
  page_sections: 'page_sections',
};

// GET - Fetch all items for a section
export async function GET(request, { params }) {
  try {
    const { section } = await params;
    const table = TABLE_MAP[section];
    if (!table) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const showInactive = searchParams.get('all') === 'true';

    let query = `SELECT * FROM ${table}`;
    if (!showInactive && table !== 'page_sections') {
      query += ` WHERE is_active = 1`;
    }
    if (table !== 'page_sections') {
      query += ` ORDER BY sort_order ASC, id ASC`;
    } else {
      query += ` ORDER BY id ASC`;
    }

    let rows = [];
    try {
      const [result] = await pool.query(query);
      rows = result;
    } catch (qErr) {
      // Table might not exist yet (migration not run)
      if (qErr.code === 'ER_NO_SUCH_TABLE' || qErr.errno === 1146) {
        return NextResponse.json({ success: true, data: [], message: 'Belum di-migrate. Jalankan migration di admin panel.' });
      }
      throw qErr;
    }
    const parsed = rows.map((row) => {
      const newRow = { ...row };
      if (newRow.features && typeof newRow.features === 'string') {
        try { newRow.features = JSON.parse(newRow.features); } catch (e) { /* keep as string */ }
      }
      if (newRow.extra_data && typeof newRow.extra_data === 'string') {
        try { newRow.extra_data = JSON.parse(newRow.extra_data); } catch (e) { /* keep as string */ }
      }
      return newRow;
    });

    return NextResponse.json({ success: true, data: parsed });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST - Create a new item
export async function POST(request, { params }) {
  try {
    verifyToken(request);
    const { section } = await params;
    const table = TABLE_MAP[section];
    if (!table) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const body = await request.json();

    // Handle page_sections differently (upsert by section_key)
    if (table === 'page_sections') {
      const { section_key, title, subtitle, description, badge_text, extra_data } = body;
      if (!section_key) {
        return NextResponse.json({ error: 'section_key is required' }, { status: 400 });
      }
      const extraDataStr = extra_data ? JSON.stringify(extra_data) : null;
      await pool.query(
        `INSERT INTO page_sections (section_key, title, subtitle, description, badge_text, extra_data)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title=VALUES(title), subtitle=VALUES(subtitle),
         description=VALUES(description), badge_text=VALUES(badge_text), extra_data=VALUES(extra_data)`,
        [section_key, title || null, subtitle || null, description || null, badge_text || null, extraDataStr]
      );
      return NextResponse.json({ success: true, message: 'Section upserted' });
    }

    // Generic insert for other tables
    const featuresStr = body.features ? JSON.stringify(body.features) : null;
    const fields = [];
    const values = [];
    const placeholders = [];

    const insertFields = {
      services: ['icon', 'title', 'description', 'features', 'color', 'sort_order', 'is_active'],
      process_steps: ['step_num', 'title', 'description', 'sort_order', 'is_active'],
      portfolio_items: ['title', 'client', 'tag', 'description', 'image_url', 'url_project', 'sort_order', 'is_active'],
      stats: ['number', 'label', 'icon', 'sort_order', 'is_active'],
      testimonials: ['name', 'role', 'avatar', 'rating', 'text', 'sort_order', 'is_active'],
      partners: ['name', 'logo_url', 'sort_order', 'is_active'],
      team_members: ['name', 'role', 'avatar', 'color', 'sort_order', 'is_active'],
      company_values: ['icon', 'title', 'description', 'sort_order', 'is_active'],
      nav_links: ['label', 'href', 'sort_order', 'is_active'],
    };

    const allowedFields = insertFields[section] || [];
    for (const field of allowedFields) {
      let value = body[field];
      if (field === 'features' && featuresStr) value = featuresStr;
      if (value !== undefined && value !== null) {
        fields.push(field);
        values.push(value);
        placeholders.push('?');
      }
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: 'No valid fields provided' }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders.join(', ')})`,
      values
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}