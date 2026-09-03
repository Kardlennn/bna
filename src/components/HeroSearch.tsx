"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Location {
  location_id: string;
  location_name: string;
}

export default function HeroSearch() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [pickupId, setPickupId] = useState("");
  const [dropoffId, setDropoffId] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set default dates
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 2);
    nextDay.setHours(10, 0, 0, 0);

    // Format for datetime-local input: YYYY-MM-DDThh:mm
    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 16);
    };

    setPickupDate(formatDate(tomorrow));
    setDropoffDate(formatDate(nextDay));

    // Fetch locations
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        if (data.length > 0) {
          setPickupId(data[0].location_id);
          setDropoffId(data[0].location_id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      pickupId,
      dropoffId,
      pickupDate,
      dropoffDate,
    }).toString();
    
    router.push(`/arama?${query}`);
  };

  return (
    <div className="bg-dark-800/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl mt-8 w-full max-w-4xl">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        
        {/* Locations */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Alış Yeri</label>
            <select 
              value={pickupId}
              onChange={(e) => setPickupId(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
              disabled={loading}
            >
              {loading ? <option>Yükleniyor...</option> : locations.map(loc => (
                <option key={loc.location_id} value={loc.location_id}>{loc.location_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Dönüş Yeri</label>
            <select 
              value={dropoffId}
              onChange={(e) => setDropoffId(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
              disabled={loading}
            >
              {loading ? <option>Yükleniyor...</option> : locations.map(loc => (
                <option key={loc.location_id} value={loc.location_id}>{loc.location_name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Alış Tarihi</label>
            <input 
              type="datetime-local" 
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none [color-scheme:dark]" 
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Dönüş Tarihi</label>
            <input 
              type="datetime-local" 
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none [color-scheme:dark]" 
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end md:w-48">
          <button 
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg transition-all h-[50px] shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            Araç Bul
          </button>
        </div>

      </form>
    </div>
  );
}
