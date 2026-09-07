"use client";

import { useState } from "react";

interface CarInfo {
  rez_id: string;
  cars_park_id: string;
  group_id: string;
  brand: string;
  type: string;
  total_rental: string;
  currency: string;
  pickupId: string;
  dropoffId: string;
  pickupDate: string;
  dropoffDate: string;
}

interface Props {
  car: CarInfo | null;
  onClose: () => void;
}

export default function ReservationModal({ car, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: ""
  });

  if (!car) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...car
        })
      });

      if (!res.ok) {
        throw new Error("Rezervasyon yapılamadı. Lütfen tekrar deneyin.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-dark-900 border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {success ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ön Rezervasyon Alındı!</h2>
            <p className="text-gray-400 mb-8">
              Talebiniz başarıyla sistemimize (Türev) ulaştı. Aracınızı sizin için ayırdık. Müşteri temsilcimiz onay ve ödeme adımları için en kısa sürede sizinle iletişime geçecektir.
            </p>
            <button 
              onClick={onClose}
              className="bg-white text-dark-900 hover:bg-gray-200 font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Tamam
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Ön Rezervasyon Talebi</h2>
            <p className="text-gray-400 mb-6 text-sm">
              <strong className="text-primary-500">{car.brand} {car.type}</strong> aracını ayırmak üzeresiniz. Lütfen iletişim bilgilerinizi girin.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Adınız</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Ahmet" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Soyadınız</label>
                  <input required type="text" value={formData.surname} onChange={e => setFormData({...formData, surname: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Yılmaz" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Telefon</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="0555 555 55 55" />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">E-Posta</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="ahmet@ornek.com" />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-xs uppercase">Ödenecek Tutar (Ofiste)</p>
                  <p className="text-2xl font-bold text-white">{car.total_rental} {car.currency}</p>
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  {loading ? "İşleniyor..." : "Talebi Gönder"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
