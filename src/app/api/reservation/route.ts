import { NextResponse } from 'next/server';
import { fetchTurev } from '@/lib/turevApi';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, surname, phone, email, 
      rez_id, cars_park_id, group_id, 
      pickupId, dropoffId, pickupDate, dropoffDate,
      brand, type, total_rental, currency
    } = body;

    // Parse dates (YYYY-MM-DDTHH:mm)
    const pDate = new Date(pickupDate);
    const dDate = new Date(dropoffDate);

    // 1. TUREV API'YE REZERVASYONU KAYDET
    const turevParams = {
      Rez_ID: rez_id,
      Cars_Park_ID: cars_park_id,
      Group_ID: group_id,
      Pickup_ID: pickupId,
      Drop_Off_ID: dropoffId,
      Name: name,
      Sur_Name: surname,
      MobilePhone: phone,
      Mail_Adress: email,
      Rental_ID: '0',
      Your_Rez_ID: `WEB-${Date.now()}`, // Benzersiz bir takip ID'si
      
      Pickup_Day: pDate.getDate().toString().padStart(2, '0'),
      Pickup_Month: (pDate.getMonth() + 1).toString().padStart(2, '0'),
      Pickup_Year: pDate.getFullYear().toString(),
      Pickup_Hour: pDate.getHours().toString().padStart(2, '0'),
      Pickup_Min: pDate.getMinutes().toString().padStart(2, '0'),
      
      Drop_Off_Day: dDate.getDate().toString().padStart(2, '0'),
      Drop_Off_Month: (dDate.getMonth() + 1).toString().padStart(2, '0'),
      Drop_Off_Year: dDate.getFullYear().toString(),
      Drop_Off_Hour: dDate.getHours().toString().padStart(2, '0'),
      Drop_Off_Min: dDate.getMinutes().toString().padStart(2, '0'),
      
      Currency: currency
    };

    // Turev API'ye kaydetme isteği (Hata verirse veya başarılı olursa devam edelim)
    let turevResponse = "Türev Yanıt Vermedi";
    try {
      const turevResult = await fetchTurev('JsonRez_Save.aspx', turevParams);
      turevResponse = JSON.stringify(turevResult);
    } catch (e: any) {
      console.error("Türev Kayıt Hatası:", e);
      // Even if Turev fails, we still want to send the email so the business doesn't lose the lead!
    }

    // 2. E-POSTA BİLDİRİMİ GÖNDER (Nodemailer ile)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // veya SMTP ayarlarınıza göre host/port
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"BNA Web Sitesi" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER, // Kendi mailinize bildirim atıyoruz
        subject: `🚨 YENİ REZERVASYON: ${brand} ${type} - ${name} ${surname}`,
        html: `
          <h2>Yeni Ön Rezervasyon Talebi</h2>
          <p>Web sitesinden yeni bir araç kiralama talebi geldi!</p>
          <hr/>
          <h3>Müşteri Bilgileri</h3>
          <ul>
            <li><strong>İsim Soyisim:</strong> ${name} ${surname}</li>
            <li><strong>Telefon:</strong> ${phone}</li>
            <li><strong>E-Posta:</strong> ${email}</li>
          </ul>
          <h3>Araç ve Rezervasyon Bilgileri</h3>
          <ul>
            <li><strong>Araç:</strong> ${brand} ${type}</li>
            <li><strong>Toplam Tutar:</strong> ${total_rental} ${currency}</li>
            <li><strong>Alış:</strong> ${pDate.toLocaleString('tr-TR')}</li>
            <li><strong>Dönüş:</strong> ${dDate.toLocaleString('tr-TR')}</li>
          </ul>
          <hr/>
          <p><strong>Türev Sistem Yanıtı:</strong> ${turevResponse}</p>
          <p><em>Lütfen müşteriyle iletişime geçip rezervasyonu teyit edin.</em></p>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP_USER veya SMTP_PASS tanımlı olmadığı için mail atılamadı.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rezervasyon Hatası:", error);
    return NextResponse.json({ error: 'Rezervasyon işlemi başarısız oldu.' }, { status: 500 });
  }
}
