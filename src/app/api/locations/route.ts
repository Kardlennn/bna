import { NextResponse } from 'next/server';
import { fetchTurev } from '@/lib/turevApi';

export async function GET() {
  try {
    const data = await fetchTurev('JsonLocations.aspx');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Lokasyonlar alınamadı' }, { status: 500 });
  }
}
