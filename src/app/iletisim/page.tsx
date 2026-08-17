import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'İletişim | BNA Rent A Car',
  description: 'Bize ulaşın. Elazığ araç kiralama rezervasyon, fiyat bilgisi ve sorularınız için 7/24 iletişim.',
};

export default function Iletisim() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/cars/07AYN738.webp" 
            alt="BNA Rent a Car İletişim" 
            fill 
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/90 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-4 block">7/24 Kesintisiz Hizmet</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6">
            Bizimle <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">İletişime Geçin</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Rezervasyon, fiyat bilgisi veya merak ettiğiniz her konu için bize dilediğiniz an ulaşabilirsiniz. 
            Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          
          {/* WhatsApp / GSM Card */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-green-500/50 transition-all duration-300 group hover:-translate-y-2 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.938 0 3.825-3.113 6.938-6.938 6.938z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Merkez Ofis / WP</h3>
            <p className="text-gray-400 mb-6 text-sm">Hızlı rezervasyon ve anında destek için WhatsApp'tan yazabilir veya arayabilirsiniz.</p>
            <div className="flex flex-col gap-3">
              <a href="https://wa.me/905332502326" target="_blank" className="w-full inline-block bg-green-500 hover:bg-green-600 text-dark-900 font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                (0533) 250 23 26
              </a>
            </div>
          </div>

          {/* Uğur Ateşçi Card */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-green-500/50 transition-all duration-300 group hover:-translate-y-2 text-center flex flex-col h-full">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Araç Sorumlusu</h3>
            <p className="text-primary-400 font-medium mb-2">Uğur Ateşçi</p>
            <p className="text-gray-400 mb-6 text-sm flex-grow">Araç durumu ve anlık bilgi için direkt olarak ulaşabilirsiniz.</p>
            <div className="flex gap-2">
              <a href="https://wa.me/905307953880" target="_blank" title="WhatsApp'tan Yaz" className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-dark-900 font-bold py-3 px-2 rounded-full transition-transform transform hover:scale-105 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/></svg>
                WP
              </a>
              <a href="tel:+905307953880" title="Hemen Ara" className="flex-1 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-2 rounded-full transition-colors border border-white/10">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                Ara
              </a>
            </div>
          </div>

          {/* Telephone Card */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-primary-500/50 transition-all duration-300 group hover:-translate-y-2 text-center">
            <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-500 group-hover:bg-primary-500 group-hover:text-dark-900 transition-colors duration-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sabit Hat</h3>
            <p className="text-gray-400 mb-6 text-sm">Ofisimize direkt ulaşmak ve bilgi almak için sabit hattımızı arayabilirsiniz.</p>
            <a href="tel:04242122444" className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-colors border border-white/10">
              (0424) 212 2 444
            </a>
          </div>

          {/* Email Card */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-primary-500/50 transition-all duration-300 group hover:-translate-y-2 text-center">
            <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-500 group-hover:bg-primary-500 group-hover:text-dark-900 transition-colors duration-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">E-Posta</h3>
            <p className="text-gray-400 mb-6 text-sm">Kurumsal talepleriniz, öneri ve şikayetleriniz için bize e-posta ile ulaşın.</p>
            <a href="mailto:bnaturizm@hotmail.com" className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-colors border border-white/10 break-all">
              bnaturizm@hotmail.com
            </a>
          </div>

        </div>

        {/* Address and Map Section */}
        <div className="bg-dark-800 rounded-3xl overflow-hidden border border-white/5 grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center justify-start space-x-2 mb-6">
              <span className="w-12 h-[2px] bg-primary-500"></span>
              <span className="text-primary-400 font-medium tracking-widest text-sm uppercase">Merkez Ofisimiz</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Sizi Ofisimizde Ağırlamaktan Mutluluk Duyarız</h2>
            
            <div className="flex items-start mb-6 group">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary-500 mr-4 flex-shrink-0 group-hover:bg-primary-500 group-hover:text-dark-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Adres</h4>
                <p className="text-gray-400 leading-relaxed">
                  Kültür Mah. Valifahribey Cad. No:111 <br />
                  <span className="text-primary-500 text-sm">(Tarım Kredi Kooperatifi Karşısı)</span><br />
                  Elazığ / Merkez
                </p>
              </div>
            </div>

            <div className="flex items-start group">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary-500 mr-4 flex-shrink-0 group-hover:bg-primary-500 group-hover:text-dark-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Çalışma Saatleri</h4>
                <p className="text-gray-400">Pazartesi - Pazar: <span className="text-white">7/24 Açık</span></p>
              </div>
            </div>
            
          </div>
          
          <div className="h-[400px] lg:h-auto min-h-[400px] relative filter grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {/* Google Maps iframe searching for Kültür mah. Valifahribey Cad. No:111 Elazığ */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3135.034444983944!2d39.2223838!3d38.6756286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4076c0471c26f041%3A0x6b3068eeb7e13768!2sK%C3%BClt%C3%BCr%2C%20Vali%20Fahri%20Bey%20Cd.%20No%3A111%2C%2023200%20Elaz%C4%B1%C4%9F%20Merkez%2FElaz%C4%B1%C4%9F!5e0!3m2!1str!2str!4v1714000000000!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0, position: 'absolute', inset: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </main>
    </div>
  );
}
