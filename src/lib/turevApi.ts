const BASE_URL = process.env.TUREV_API_URL || 'http://sistemjson1.trvrac.com';
const API_KEY = process.env.TUREV_API_KEY || '';
const USER_NAME = process.env.TUREV_API_USER || '';
const USER_PASS = process.env.TUREV_API_PASS || '';

export function buildTurevUrl(endpoint: string, additionalParams: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append('Key_Hack', API_KEY);
  url.searchParams.append('User_Name', USER_NAME);
  url.searchParams.append('User_Pass', USER_PASS);
  url.searchParams.append('Lang', 'TR');

  for (const [key, value] of Object.entries(additionalParams)) {
    url.searchParams.append(key, value);
  }

  return url.toString();
}

export async function fetchTurev<T>(endpoint: string, additionalParams: Record<string, string> = {}): Promise<T> {
  const url = buildTurevUrl(endpoint, additionalParams);
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`API Hatası: ${res.statusText}`);
    }
    
    // Some endpoints might return empty string if no results, handle it
    const text = await res.text();
    if (!text || text.trim() === '') {
      return [] as any;
    }
    
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      console.error("JSON Parse Error:", text.substring(0, 100));
      return [] as any;
    }
  } catch (error) {
    console.error(`[Turev API Error] ${endpoint}:`, error);
    throw error;
  }
}
