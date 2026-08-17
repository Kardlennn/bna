"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const IMAGES = [
  "/cars/34CDU768.webp",
  "/cars/07AYN738.webp",
  "/cars/34SK7182.webp",
  "/cars/06AGB858.webp"
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-transparent rounded-3xl border border-white/10 glass-panel flex items-center justify-center overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-[0_20px_50px_rgba(239,68,68,0.2)]">
      {IMAGES.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Premium Kiralık Araç ${index + 1}`}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-90 hover:opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80 z-10 pointer-events-none"></div>
      <div className="absolute bottom-8 left-8 z-20">
        <span className="bg-primary-500 text-dark-900 px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase mb-2 inline-block shadow-lg">Premium Filo</span>
        <h3 className="text-2xl font-bold text-white drop-shadow-md">Yolculuğun Tadını Çıkarın</h3>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex space-x-2">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary-500 w-6" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slayt ${index + 1}'e git`}
          />
        ))}
      </div>
    </div>
  );
}
