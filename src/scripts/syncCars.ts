const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });


async function run() {
  const compUser = process.env.TUREV_COMPANY_USERNAME;
  const compPass = process.env.TUREV_COMPANY_PASSWORD;
  const userUser = process.env.TUREV_USER_USERNAME;
  const userPass = process.env.TUREV_USER_PASSWORD;

  if (!compUser || !compPass || !userUser || !userPass || compUser === 'firma_kullanici_adiniz') {
    console.error('Lütfen .env.local dosyasındaki 4 bilgiyi doldurun.');
    process.exit(1);
  }

  console.log('Tarayıcı başlatılıyor...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('1. Aşama: Giriş yapılıyor...');
    await page.goto('http://turev5.turevrac.com/Login.aspx', { timeout: 30000 });
    
    // 1. Adım: Firma girişi ekranı gelirse (örneğin farklı IP'den girince)
    try {
      const firmaInput = await page.waitForSelector('#TextBoxKll', { timeout: 5000 });
      if (firmaInput) {
        console.log('Firma girişi ekranı algılandı, firma bilgileri giriliyor...');
        await page.fill('#TextBoxKll', process.env.TUREV_COMPANY_USERNAME || '');
        await page.fill('#TextBoxSfr', process.env.TUREV_COMPANY_PASSWORD || '');
        await page.click('#Button1');
        await page.waitForNavigation({ timeout: 15000 }).catch(() => {});
      }
    } catch (e) {
      console.log('Firma girişi ekranı atlandı (veya zaten personel ekranındayız).');
    }

    // 2. Adım: Personel girişi
    console.log('Personel girişi bekleniyor...');
    await page.waitForSelector('#TextBoxPr_Kll', { timeout: 15000 });
    await page.fill('#TextBoxPr_Kll', process.env.TUREV_USER_USERNAME || '');
    await page.fill('#TextBoxPr_Pass', process.env.TUREV_USER_PASSWORD || '');
    
    const btn2 = await page.$('#Button2');
    if (btn2) {
       await page.click('#Button2');
    } else {
       await page.click('#Button1');
    }
    
    console.log('2. Aşama: Giriş tamamlandı, panelin yüklenmesi bekleniyor...');
    await page.waitForTimeout(10000);
    
    console.log('Müsait Araçlar sayfasına (Bos_Arac_Listesi.aspx) gidiliyor...');
    await page.goto('http://turev5.turevrac.com/Bos_Arac_Listesi.aspx', { timeout: 30000 });
    
    let availableCars: any[] = [];
    try {
      await page.waitForSelector('.dxgvDataRow', { timeout: 10000 });
      availableCars = await page.$$eval('.dxgvDataRow', (rows: Element[]) => {
        return rows.map((row: Element) => {
          const cells = row.querySelectorAll('td');
          if (cells.length < 9) return null;
          return {
            id: (cells[2] as HTMLElement)?.innerText?.trim() || '',
            brand: (cells[4] as HTMLElement)?.innerText?.trim() || '',
            model: (cells[5] as HTMLElement)?.innerText?.trim() || '',
            year: parseInt((cells[6] as HTMLElement)?.innerText?.trim() || '0') || 2023,
            fuel: (cells[7] as HTMLElement)?.innerText?.trim() || '',
            transmission: (cells[8] as HTMLElement)?.innerText?.trim() || '',
            status: 'Müsait',
            imageUrl: '/Files/img/default-car.png'
          };
        }).filter((c: any) => c && c.id !== '');
      });
    } catch (e) {
      console.log('Müsait araç bulunamadı (tablo yüklenmedi).');
    }

    console.log(`Toplam ${availableCars.length} adet müsait araç bulundu.`);
    
    console.log('Kiradaki araçlar sayfasına (Kira_Listesi.aspx) gidiliyor...');
    await page.goto('http://turev5.turevrac.com/Kira_Listesi.aspx?Kira_Durum=Kirada&TarihX=0', { timeout: 30000 });
    
    console.log('Kiradaki araçlar çekiliyor...');
    let rentedCars: any[] = [];
    try {
      await page.waitForSelector('.dxgvDataRow', { timeout: 10000 });
      rentedCars = await page.$$eval('.dxgvDataRow', (rows: Element[]) => {
        return rows.map((row: Element) => {
          const cells = row.querySelectorAll('td');
          if (cells.length < 9) return null;
          return {
            id: (cells[2] as HTMLElement)?.innerText?.trim() || '',
            brand: (cells[4] as HTMLElement)?.innerText?.trim() || '',
            model: (cells[5] as HTMLElement)?.innerText?.trim() || '',
            fuel: (cells[6] as HTMLElement)?.innerText?.trim() || '',
            transmission: (cells[7] as HTMLElement)?.innerText?.trim() || '',
            year: parseInt((cells[8] as HTMLElement)?.innerText?.trim() || '0') || 2023,
            status: 'Kirada',
            imageUrl: '/Files/img/default-car.png'
          };
        }).filter((c: any) => c && c.id !== '');
      });
    } catch (e) {
      console.log('Kirada araç bulunamadı (tablo yüklenmedi).');
    }
    
    console.log(`Toplam ${rentedCars.length} adet kirada araç bulundu.`);
    
    const allCarsMap = new Map();
    
    // Önce müsait araçları ekle
    availableCars.forEach(car => allCarsMap.set(car.id, car));
    
    // Sonra kiradaki araçları ekle. Eğer aynı araç her iki listede de varsa, 'Kirada' durumu geçerli olur!
    rentedCars.forEach(car => allCarsMap.set(car.id, car));
    
    let allCars = Array.from(allCarsMap.values());
    
    // Assign consistent images based on plate number (ID)
    allCars = allCars.map(car => {
      if (!car.id) return car;
      
      // Use the plate number directly for the image name
      car.imageUrl = `/cars/${car.id}.webp`;
      
      return car;
    });
    
    const carsJsonPath = path.resolve(__dirname, '../../src/data/cars.json');
    fs.writeFileSync(carsJsonPath, JSON.stringify(allCars, null, 2), 'utf-8');
    console.log('Tüm araçlar src/data/cars.json dosyasına başarıyla kaydedildi!');

    
  } catch (error) {
    console.error('Hata oluştu:', error);
    try {
      const html = await page.content();
      console.error('--- HATA ANINDAKI SAYFA HTML ---');
      console.error(html.substring(0, 2000)); // Print first 2000 characters
      console.error('---------------------------------');
    } catch (e) {}
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
