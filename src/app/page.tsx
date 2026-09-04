import Link from 'next/link';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import Navbar from '@/components/Navbar';
import HeroSearch from '@/components/HeroSearch';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex items-center relative overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 bg-dark-900">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-900/20 rounded-full blur-[120px] opacity-50 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-800/10 rounded-full blur-[100px] opacity-30 -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="flex flex-col justify-center text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start space-x-2 mb-6">
                <span className="w-12 h-[2px] bg-primary-500"></span>
                <span className="text-primary-400 font-medium tracking-widest text-sm uppercase">Premium Araç Kiralama</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Yolculuğun <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                  Yeni Sınırı
                </span>
              </h1>
              <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Elazığ'ın en seçkin ve bakımlı araç filosuyla tanışın. Güvenli, konforlu ve kesintisiz bir deneyim için yola bizimle çıkın.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/filomuz" className="bg-primary-500 hover:bg-primary-600 text-dark-900 font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] text-lg text-center flex items-center justify-center">
                  Filomuzu Keşfet
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
                <Link href="/iletisim" className="glass-panel hover:bg-white/5 text-white font-medium py-4 px-8 rounded-full transition-all text-lg text-center border border-white/10">
                  Bizimle İletişime Geç
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">7/24</h3>
                  <p className="text-sm text-gray-400">Yol Yardım</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">%100</h3>
                  <p className="text-sm text-gray-400">Bakımlı Araç</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">Hızlı</h3>
                  <p className="text-sm text-gray-400">Rezervasyon</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block h-[500px]">
              <HeroCarousel />
            </div>

          </div>
        </div>
      </main>

      {/* Floating Search Engine Overlay */}
      <div className="relative z-40 px-4 sm:px-6 lg:px-8">
        <HeroSearch />
      </div>

      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 mt-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ayrıcalıklı Kiralama Deneyimi</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Premium filomuz ve kusursuz hizmet anlayışımızla Elazığ'da standartları yeniden belirliyoruz.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
