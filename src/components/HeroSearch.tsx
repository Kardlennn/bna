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
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 2);
    nextDay.setHours(10, 0, 0, 0);

    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 16);
    };

    setPickupDate(formatDate(tomorrow));
    setDropoffDate(formatDate(nextDay));

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
    <div className="w-full max-w-6xl mx-auto -mt-16 relative z-30">
      <div className="bg-dark-900/80 backdrop-blur-2xl p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Pick-up Location */}
          <div className="flex-1 w-full bg-dark-950/50 rounded-xl p-3 md:p-4 border border-white/5 hover:border-primary-500/30 transition-colors group">
            <label className="flex items-center text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">
              <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Alış Ofisi
            </label>
            <select 
              value={pickupId}
              onChange={(e) => setPickupId(e.target.value)}
              className="w-full bg-transparent text-white font-medium text-base md:text-lg focus:outline-none appearance-none cursor-pointer"
              disabled={loading}
            >
              {loading ? <option>Lokasyonlar yükleniyor...</option> : locations.map(loc => (
                <option key={loc.location_id} value={loc.location_id} className="bg-dark-900 text-white">{loc.location_name}</option>
              ))}
            </select>
          </div>

          {/* Divider hidden on mobile */}
          <div className="hidden lg:block w-px h-16 bg-white/10"></div>

          {/* Pick-up Date */}
          <div className="flex-1 w-full bg-dark-950/50 rounded-xl p-3 md:p-4 border border-white/5 hover:border-primary-500/30 transition-colors group">
            <label className="flex items-center text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">
              <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Alış Tarihi
            </label>
            <input 
              type="datetime-local" 
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-transparent text-white font-medium text-base md:text-lg focus:outline-none [color-scheme:dark] cursor-pointer" 
            />
          </div>

          {/* Divider hidden on mobile */}
          <div className="hidden lg:block w-px h-16 bg-white/10"></div>

          {/* Drop-off Date */}
          <div className="flex-1 w-full bg-dark-950/50 rounded-xl p-3 md:p-4 border border-white/5 hover:border-primary-500/30 transition-colors group">
            <label className="flex items-center text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">
              <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              İade Tarihi
            </label>
            <input 
              type="datetime-local" 
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full bg-transparent text-white font-medium text-base md:text-lg focus:outline-none [color-scheme:dark] cursor-pointer" 
            />
          </div>

          {/* Search Button */}
          <div className="w-full lg:w-auto mt-2 lg:mt-0 pl-0 lg:pl-4">
            <button 
              type="submit"
              className="w-full lg:w-[180px] h-[72px] bg-gradient-to-r from-primary-600 to-red-700 hover:from-primary-500 hover:to-red-600 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] flex items-center justify-center gap-2"
            >
              Araç Bul
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
