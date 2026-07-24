import { NextResponse } from 'next/server';
import pool from '@/src/lib/db';

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

const UPDATE_FIELDS = {
  services: ['icon', 'title', 'description', 'features', 'color', 'sort_order', 'is_active'],
  process_steps: ['step_num', 'title', 'description', 'sort_order', 'is_active'],
  portfolio_items: ['title', 'client', 'tag', 'description', 'image_url', 'url_project', 'sort_order', 'is_active'],
  stats: ['number', 'label', 'icon', 'sort_order', 'is_active'],
  testimonials: ['name', 'role', 'avatar', 'rating', 'text', 'sort_order', 'is_active'],
  partners: ['name', 'logo_url', 'sort_order', 'is_active'],
  team_members: ['name', 'role', 'avatar', 'color', 'image_url', 'sort_order', 'is_active'],
  company_values: ['icon', 'title', 'description', 'sort_order', 'is_active'],
  nav_links: ['label', 'href', 'sort_order', 'is_active'],
  page_sections: ['section_key', 'title', 'subtitle', 'description', 'badge_text', 'extra_data'],
};

// PUT - Update an item
export async function PUT(request, { params }) {
  try {
    const { section, id } = await params;
    const table = TABLE_MAP[section];
    if (!table) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const body = await request.json();
    const allowedFields = UPDATE_FIELDS[section] || [];
    const setClauses = [];
    const values = [];

    for (const field of allowedFields) {
      let value = body[field];
      if (field === 'features' && Array.isArray(value)) {
        value = JSON.stringify(value);
      }
      if (field === 'extra_data' && value !== undefined && value !== null) {
        value = typeof value === 'object' ? JSON.stringify(value) : value;
      }
      if (value !== undefined) {
        setClauses.push(`${field} = ?`);
        values.push(value);
      }
    }

    if (setClauses.length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    values.push(id);
    await pool.query(`UPDATE ${table} SET ${setClauses.join(', ')} WHERE id = ?`, values);

    return NextResponse.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE - Delete an item
export async function DELETE(request, { params }) {
  try {
    const { section, id } = await params;
    const table = TABLE_MAP[section];
    if (!table) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}