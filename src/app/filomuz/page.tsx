import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { fetchTurev } from '@/lib/turevApi';

export const metadata = {
  title: 'Filomuz | BNA Rent A Car',
  description: 'Geniş ve premium araç filomuz içerisinden size en uygun olanı seçin.',
};

export const revalidate = 3600;

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
    <div className="min-h-screen flex flex-col bg-dark-950 relative overflow-hidden">
      <Navbar />

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary-900/10 to-transparent pointer-events-none"></div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full relative z-10">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-red-600">Filomuz</span></h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Sizler için özenle hazırladığımız, düzenli bakımları yapılan kiralık araç sınıflarımız.
            Fiyat ve müsaitlik durumu için lütfen arama motorumuzu kullanın.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {groups.map((group) => (
            <div key={group.group_id} className="bg-dark-900 rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary-500/40 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(239,68,68,0.15)] flex flex-col">
              
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-white/5 flex items-center justify-center p-8 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80 z-0"></div>
                {group.image_path ? (
                  <img 
                    src={`http://sistemjson1.trvrac.com/images/${group.image_path}`} 
                    alt={group.group_name}
                    className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                  />
                ) : (
                  <div className="relative z-10 text-white/20 font-extrabold text-4xl text-center tracking-widest uppercase">
                    {group.brand} <br/> {group.type}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="mb-6">
                  <h3 className="text-3xl font-extrabold text-white mb-2">{group.brand} {group.type}</h3>
                  <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">{group.group_name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8">
                  <div className="flex items-center text-gray-300 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 border border-white/10 group-hover:border-primary-500/30 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                    </div>
                    {group.transmission}
                  </div>
                  <div className="flex items-center text-gray-300 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 border border-white/10 group-hover:border-primary-500/30 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                    </div>
                    {group.fuel}
                  </div>
                  <div className="flex items-center text-gray-300 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 border border-white/10 group-hover:border-primary-500/30 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                    </div>
                    {group.chairs} Koltuk
                  </div>
                  <div className="flex items-center text-gray-300 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 border border-white/10 group-hover:border-primary-500/30 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                    </div>
                    {group.big_bags} Bagaj
                  </div>
                </div>

                <div className="mt-auto">
                  <Link 
                    href="/" 
                    className="w-full flex items-center justify-center bg-white/5 hover:bg-primary-600 text-white font-bold py-4 rounded-xl transition-all duration-300 border border-white/10 hover:border-transparent group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  >
                    Tarih Seç ve Fiyat Gör
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
