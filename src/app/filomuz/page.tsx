import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { fetchTurev } from '@/lib/turevApi';

export const metadata = {
  title: 'Filomuz | BNA Rent A Car',
  description: 'Geniş araç filomuz içerisinden size en uygun olanı seçin.',
};

export const revalidate = 3600; // Cache for 1 hour

interface CarGroup {
  group_id: string;
  group_name: string;
  brand: string;
  type: string;
  fuel: string;
  transmission: string;
  chairs: string;
  big_bags: string;
  small_bags: string;
  image_path?: string;
}

export default async function Filomuz() {
  const groups = await fetchTurev<CarGroup[]>('JsonGroup.aspx');
  
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Filomuz</h1>
          <p className="text-gray-400 max-w-2xl">
            Sizler için özenle hazırladığımız, düzenli bakımları yapılan kiralık araç sınıflarımız.
            Lütfen müsaitlik durumu için ana sayfadaki arama motorunu kullanın.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div key={group.group_id} className="glass-panel rounded-2xl overflow-hidden border border-white/5 group hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(239,68,68,0.15)]">
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-white flex items-center justify-center p-4">
                {/* Fallback for images until the client uploads Turev images or we map them */}
                {group.image_path ? (
                  <img 
                    src={`http://sistemjson1.trvrac.com/images/${group.image_path}`} 
                    alt={group.group_name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="text-dark-900 font-extrabold text-2xl text-center opacity-70">
                    {group.brand} {group.type}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{group.brand} {group.type}</h3>
                <p className="text-gray-400 text-sm mb-4">{group.group_name}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-300 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                    {group.transmission}
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                    {group.fuel}
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                    {group.chairs} Koltuk
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                    {group.big_bags} Büyük Bagaj
                  </div>
                </div>

                <Link 
                  href="/" 
                  className="w-full block text-center bg-white/5 hover:bg-primary-500 hover:text-dark-900 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10 hover:border-transparent"
                >
                  Tarih Seç ve Fiyat Gör
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
