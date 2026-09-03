"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

interface SearchResult {
  Rez_ID: string;
  Cars_Park_ID: string;
  Group_ID: string;
  Car_Name: string;
  Daily_Rental: string;
  Total_Rental: string;
  Currency: string;
  Transmission: string;
  Fuel: string;
  Days: string;
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
      setError("Geçersiz arama parametreleri.");
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12 text-xl">{error}</div>;
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-white mb-4">Üzgünüz</h2>
        <p className="text-gray-400 text-lg">Seçtiğiniz tarihlerde müsait aracımız bulunamadı. Lütfen farklı tarihler deneyin.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {results.map((car, idx) => (
        <div key={idx} className="bg-dark-800 rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/50 transition-all group flex flex-col h-full shadow-lg hover:shadow-primary-500/10">
          <div className="relative h-48 w-full bg-white flex items-center justify-center p-4">
            {/* Fallback image if group image is not mapped, ideally we'd map Group_ID to our local images */}
            <div className="text-dark-900 font-bold text-xl text-center">{car.Car_Name}</div>
          </div>
          
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2">{car.Car_Name}</h3>
            
            <div className="flex items-center gap-4 text-gray-400 mb-6 text-sm">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>{car.Transmission}</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>{car.Fuel}</span>
            </div>
            
            <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{car.Days} Günlük Toplam</p>
                <p className="text-3xl font-bold text-primary-500">{car.Total_Rental} {car.Currency}</p>
              </div>
              
              <button className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Hemen Kirala
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Arama Sonuçları</h1>
          <p className="text-gray-400 text-lg">Seçtiğiniz tarihlerdeki müsait araçlarımız</p>
        </div>
        
        <Suspense fallback={<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 mx-auto"></div>}>
          <SearchResultsContent />
        </Suspense>
      </main>
    </div>
  );
}
