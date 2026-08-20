import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/data/cars';
import carsData from '@/data/cars.json';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Filomuz | BNA Rent A Car',
  description: 'Geniş araç filomuz içerisinden size en uygun olanı seçin.',
};

export default function Filomuz() {
  const cars = carsData as Car[];
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Filomuz</h1>
          <p className="text-gray-400 max-w-2xl">
            Sizler için özenle hazırladığımız, düzenli bakımları yapılan kiralık araç filomuzu inceleyin.
            Lütfen kiralama işlemleri için bizimle iletişime geçin.
          </p>
        </div>



        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="glass-panel rounded-2xl overflow-hidden border border-white/5 group hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)]">
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-dark-800">
                <img 
                  src={car.imageUrl} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {car.status === 'Müsait' ? (
                    <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center backdrop-blur-md">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      MÜSAİT
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center backdrop-blur-md">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      KİRADA
                    </span>
                  )}
                </div>


              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{car.brand} {car.model}</h3>
                <p className="text-gray-400 text-sm mb-4">{car.year} Model</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    {car.transmission}
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    {car.fuel}
                  </div>
                </div>

                <a 
                  href="https://wa.me/905332502326" 
                  target="_blank"
                  className="w-full block text-center bg-white/5 hover:bg-primary-500 hover:text-dark-900 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10 hover:border-transparent"
                >
                  Whatsapp'tan Sor
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
