import { NextResponse } from 'next/server';
import { fetchTurev } from '@/lib/turevApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const pickupId = searchParams.get('pickupId');
  const dropoffId = searchParams.get('dropoffId');
  const pickupDateStr = searchParams.get('pickupDate');
  const dropoffDateStr = searchParams.get('dropoffDate');
  const currency = searchParams.get('currency') || 'TL';

  if (!pickupId || !dropoffId || !pickupDateStr || !dropoffDateStr) {
    return NextResponse.json({ error: 'Eksik parametreler' }, { status: 400 });
  }

  // Parse dates (expected format from frontend: YYYY-MM-DDTHH:mm)
  const pickupDate = new Date(pickupDateStr);
  const dropoffDate = new Date(dropoffDateStr);

  const params = {
    Pickup_ID: pickupId,
    Drop_Off_ID: dropoffId,
    Pickup_Day: pickupDate.getDate().toString().padStart(2, '0'),
    Pickup_Month: (pickupDate.getMonth() + 1).toString().padStart(2, '0'),
    Pickup_Year: pickupDate.getFullYear().toString(),
    Pickup_Hour: pickupDate.getHours().toString().padStart(2, '0'),
    Pickup_Min: pickupDate.getMinutes().toString().padStart(2, '0'),
    
    Drop_Off_Day: dropoffDate.getDate().toString().padStart(2, '0'),
    Drop_Off_Month: (dropoffDate.getMonth() + 1).toString().padStart(2, '0'),
    Drop_Off_Year: dropoffDate.getFullYear().toString(),
    Drop_Off_Hour: dropoffDate.getHours().toString().padStart(2, '0'),
    Drop_Off_Min: dropoffDate.getMinutes().toString().padStart(2, '0'),
    
    Currency: currency
  };

  try {
    const data = await fetchTurev('JsonRez.aspx', params);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Arama sonuçları alınamadı' }, { status: 500 });
  }
}
