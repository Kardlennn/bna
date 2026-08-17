"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname?.startsWith(path);
  };

  return (
    <>
      <nav className="w-full z-50 glass-panel border-b border-white/10 sticky top-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center bg-white px-3 py-1.5 rounded-lg z-50">
              <Link href="/" onClick={closeMobileMenu}>
                <Image 
                  src="/logo.png" 
                  alt="BNA Rent A Car Logo" 
                  width={160} 
                  height={50} 
                  className="object-contain h-10 w-auto cursor-pointer" 
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link 
                href="/" 
                className={`${isActive('/') ? 'text-primary-500' : 'text-gray-300 hover:text-primary-400'} transition-colors px-3 py-2 text-sm font-medium`}
              >
                Anasayfa
              </Link>
              <Link 
                href="/filomuz" 
                className={`${isActive('/filomuz') ? 'text-primary-500' : 'text-gray-300 hover:text-primary-400'} transition-colors px-3 py-2 text-sm font-medium`}
              >
                Filomuz
              </Link>
              <Link 
                href="/hakkimizda" 
                className={`${isActive('/hakkimizda') ? 'text-primary-500' : 'text-gray-300 hover:text-primary-400'} transition-colors px-3 py-2 text-sm font-medium`}
              >
                Hakkımızda
              </Link>
              <Link 
                href="/iletisim" 
                className={`${isActive('/iletisim') ? 'text-primary-500' : 'text-gray-300 hover:text-primary-400'} transition-colors px-3 py-2 text-sm font-medium`}
              >
                İletişim
              </Link>
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Menüyü aç</span>
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay (Glassmorphism Dropdown) */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-dark-900/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        id="mobile-menu"
      >
        <div className="pt-24 pb-6 px-4 space-y-2 h-full flex flex-col">
          <Link 
            href="/" 
            onClick={closeMobileMenu}
            className={`${isActive('/') ? 'bg-primary-500/20 text-primary-500 border-l-4 border-primary-500' : 'text-gray-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent'} block px-4 py-4 rounded-r-md text-lg font-medium transition-colors`}
          >
            Anasayfa
          </Link>
          <Link 
            href="/filomuz" 
            onClick={closeMobileMenu}
            className={`${isActive('/filomuz') ? 'bg-primary-500/20 text-primary-500 border-l-4 border-primary-500' : 'text-gray-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent'} block px-4 py-4 rounded-r-md text-lg font-medium transition-colors`}
          >
            Filomuz
          </Link>
          <Link 
            href="/hakkimizda" 
            onClick={closeMobileMenu}
            className={`${isActive('/hakkimizda') ? 'bg-primary-500/20 text-primary-500 border-l-4 border-primary-500' : 'text-gray-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent'} block px-4 py-4 rounded-r-md text-lg font-medium transition-colors`}
          >
            Hakkımızda
          </Link>
          <Link 
            href="/iletisim" 
            onClick={closeMobileMenu}
            className={`${isActive('/iletisim') ? 'bg-primary-500/20 text-primary-500 border-l-4 border-primary-500' : 'text-gray-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent'} block px-4 py-4 rounded-r-md text-lg font-medium transition-colors`}
          >
            İletişim
          </Link>

          {/* Mobile Fast Contact Button */}
          <div className="mt-auto pb-8 pt-8">
            <a 
              href="https://wa.me/905332502326" 
              target="_blank"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-dark-900 font-bold py-4 rounded-xl transition-colors shadow-lg shadow-green-500/20"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/></svg>
              <span>Hemen WhatsApp'tan Yazın</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
