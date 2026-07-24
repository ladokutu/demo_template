import { NextResponse } from 'next/server';
import { runMigration, runSeedData } from '../../../src/lib/migrate.js';

export async function GET() {
  return NextResponse.json({
    message: 'Migration endpoint. Gunakan POST request dengan ?type=migration atau ?type=seed',
    instructions: 'Buka /admin → Login → Klik tombol migrasi di sidebar',
  });
}

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'migration';
    
    if (type === 'seed') {
      const result = await runSeedData();
      return NextResponse.json(result, { status: 200 });
    }
    
    const result = await runMigration();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
