"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

interface SearchResult {
  rez_id: string;
  cars_park_id: string;
  group_id: string;
  car_name: string;
  daily_rental: string;
  total_rental: string;
  currency: string;
  transmission: string;
  fuel: string;
  days: string;
  image_path: string;
  brand: string;
  type: string;
  big_bags: string;
  small_bags: string;
  chairs: string;
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const pickupId = searchParams.get('pickupId');
    const dropoffId = searchParams.get('dropoffId');
    const pickupDate = searchParams.get('pickupDate');
    const dropoffDate = searchParams.get('dropoffDate');

    if (!pickupId || !pickupDate || !dropoffDate) {
      setError("Lütfen arama yapmak için tarih ve lokasyon seçin.");
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const query = new URLSearchParams({
          pickupId,
          dropoffId: dropoffId || pickupId,
          pickupDate,
          dropoffDate
        }).toString();
        
        const res = await fetch(`/api/search?${query}`);
        if (!res.ok) throw new Error("Arama yapılamadı");
        
        const data = await res.json();
        setResults(data);
      } catch (err) {
        setError("Araçlar yüklenirken bir sorun oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-full h-64 bg-dark-900/50 rounded-2xl border border-white/5 animate-pulse flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/3 bg-white/5 h-48 md:h-full"></div>
            <div className="p-6 md:p-8 flex-1 space-y-4">
              <div className="h-8 bg-white/10 rounded w-1/2"></div>
              <div className="h-4 bg-white/10 rounded w-1/3"></div>
              <div className="flex gap-4 pt-4">
                <div className="h-6 bg-white/5 rounded w-16"></div>
                <div className="h-6 bg-white/5 rounded w-16"></div>
                <div className="h-6 bg-white/5 rounded w-16"></div>
              </div>
            </div>
            <div className="w-full md:w-1/4 bg-dark-950 p-6 flex flex-col justify-center border-l border-white/5">
              <div className="h-6 bg-white/10 rounded w-full mb-4"></div>
              <div className="h-12 bg-primary-900/20 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-dark-900/50 rounded-3xl border border-white/5 max-w-3xl mx-auto shadow-2xl">
        <svg className="w-20 h-20 text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <h2 className="text-2xl font-bold text-white mb-2">Hata Oluştu</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20 bg-dark-900/50 rounded-3xl border border-white/5 max-w-3xl mx-auto shadow-2xl">
        <svg className="w-24 h-24 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        <h2 className="text-3xl font-bold text-white mb-4">Araç Bulunamadı</h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto">Seçtiğiniz tarihlerde müsait aracımız kalmamıştır. Lütfen farklı tarihler veya lokasyonlar deneyin.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {results.map((car, idx) => (
        <div key={idx} className="bg-dark-900/80 backdrop-blur-md rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary-500/50 transition-all group flex flex-col md:flex-row shadow-xl hover:shadow-[0_10px_40px_rgba(239,68,68,0.15)]">
          
          {/* Car Image */}
          <div className="w-full md:w-2/5 h-56 md:h-auto bg-white flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute top-4 left-4 bg-dark-900 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-lg z-10">
              {car.car_name}
            </div>
            {car.image_path ? (
              <img 
                src={`http://sistemjson1.trvrac.com/images/${car.image_path}`} 
                alt={car.car_name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
              />
            ) : (
              <div className="text-dark-900 font-extrabold text-3xl text-center opacity-70">
                {car.brand} <br/> {car.type}
              </div>
            )}
          </div>
          
          {/* Car Details */}
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 group-hover:text-primary-400 transition-colors">{car.brand} {car.type}</h3>
            <p className="text-gray-400 text-sm mb-6">{car.car_name}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-300 text-sm font-medium bg-dark-950 px-3 py-2 rounded-lg border border-white/5">
                <span className="w-2 h-2 rounded-full bg-primary-500 mr-3"></span>
                {car.transmission}
              </div>
              <div className="flex items-center text-gray-300 text-sm font-medium bg-dark-950 px-3 py-2 rounded-lg border border-white/5">
                <span className="w-2 h-2 rounded-full bg-primary-500 mr-3"></span>
                {car.fuel}
              </div>
              <div className="flex items-center text-gray-300 text-sm font-medium bg-dark-950 px-3 py-2 rounded-lg border border-white/5">
                <span className="w-2 h-2 rounded-full bg-primary-500 mr-3"></span>
                {car.chairs} Koltuk
              </div>
              <div className="flex items-center text-gray-300 text-sm font-medium bg-dark-950 px-3 py-2 rounded-lg border border-white/5">
                <span className="w-2 h-2 rounded-full bg-primary-500 mr-3"></span>
                {car.big_bags} Bagaj
              </div>
            </div>
          </div>

          {/* Pricing & Action */}
          <div className="w-full md:w-1/3 bg-dark-950 p-6 md:p-8 flex flex-col justify-center items-center text-center">
            <div className="mb-2 w-full text-right">
              <p className="text-gray-400 text-sm font-medium">Günlük</p>
              <p className="text-xl font-bold text-white">{car.daily_rental} {car.currency}</p>
            </div>
            
            <div className="w-full h-px bg-white/10 my-4"></div>

            <div className="mb-6 w-full text-right">
              <p className="text-gray-400 text-sm font-medium mb-1">{car.days} Günlük Toplam</p>
              <p className="text-4xl font-extrabold text-primary-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">{car.total_rental} <span className="text-2xl">{car.currency}</span></p>
            </div>
            
            <button className="w-full bg-white text-dark-900 hover:bg-primary-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] font-bold text-lg py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
              Hemen Kirala
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950 relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-[120px]"></div>
      </div>

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-5xl mx-auto mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Arama Sonuçları</h1>
            <p className="text-gray-400 text-lg">Seçtiğiniz tarihlerde size en uygun araçlar listeleniyor.</p>
          </div>
          
          <button onClick={() => window.history.back()} className="mt-6 md:mt-0 text-white/70 hover:text-white flex items-center bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors border border-white/10">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Aramayı Değiştir
          </button>
        </div>
        
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
          </div>
        }>
          <SearchResultsContent />
        </Suspense>
      </main>
    </div>
  );
}
