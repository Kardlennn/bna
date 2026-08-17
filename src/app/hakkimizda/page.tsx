import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Hakkımızda | BNA Rent A Car',
  description: 'Elazığ Havalimanı teslimatlı ve ücretsiz vale hizmetli premium araç kiralama şirketiniz.',
};

export default function Hakkimizda() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative py-24 lg:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/cars/27BEA907.webp" 
            alt="BNA Rent a Car Ofis" 
            fill 
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-4 block">Yolculuğunuzda Güvenilir Ortağınız</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6">
            Bizimle Yola Çıkın, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Ayrıcalığı Hissedin</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Elazığ'ın en köklü ve güvenilir rent a car firması olarak, %100 bakımlı geniş araç filomuzla hizmetinizdeyiz. 
            Müşteri memnuniyetini temel alan çalışma prensibimizle seyahatlerinizi keyfe dönüştürüyoruz.
          </p>
        </div>
      </div>

      {/* Values & Features */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Neden Bizi Seçmelisiniz?</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Feature 1 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Havalimanı Teslimatı</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elazığ Havalimanı'na indiğiniz an aracınız hazır. Size özel kesintisiz ve beklemesiz araç teslimat hizmeti sunuyoruz.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Ücretsiz Vale</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Şehrin neresinde olursanız olun, aracınızı ücretsiz vale hizmetimizle kapınıza kadar getirip kapınızdan teslim alıyoruz.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">%100 Bakımlı Filo</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tüm araçlarımız periyodik bakımdan geçirilir, detaylı temizlenir ve yolculuğunuza eksiksiz hazır edilir.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">7/24 Kesintisiz Destek</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Yolculuğunuz boyunca yaşayabileceğiniz her türlü sorunda 7/24 yanınızda olan profesyonel yol yardım ekibimiz var.
            </p>
          </div>

        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-gradient-to-r from-dark-800 to-dark-900 p-12 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-primary-500/5 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">10+</div>
            <div className="text-primary-400 font-medium tracking-wide">Yıllık Tecrübe</div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">5000+</div>
            <div className="text-primary-400 font-medium tracking-wide">Mutlu Müşteri</div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">7/24</div>
            <div className="text-primary-400 font-medium tracking-wide">Destek Hattı</div>
          </div>
        </div>

      </main>
    </div>
  );
}
