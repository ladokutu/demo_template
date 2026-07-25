import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { verifyToken } from '@/src/lib/auth';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    verifyToken(request);
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File type not allowed. Use JPG, PNG, GIF, WebP, or SVG.' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = path.extname(file.name) || '.jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    
    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;
    
    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}