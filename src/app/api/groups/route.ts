import { NextResponse } from 'next/server';
import { fetchTurev } from '@/lib/turevApi';

export async function GET() {
  try {
    const data = await fetchTurev('JsonGroup.aspx');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Araç grupları alınamadı' }, { status: 500 });
  }
}
