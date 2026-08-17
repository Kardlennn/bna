const { chromium } = require('playwright');
const path = require('path');

async function captureNewLogin() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log("Yeni adrese gidiliyor (http://turev5.turevrac.com/Login.aspx)...");
  try {
    await page.goto('http://turev5.turevrac.com/Login.aspx', { timeout: 30000 });
    
    console.log("Ekran görüntüsü alınıyor...");
    await page.screenshot({ path: path.join(__dirname, 'login_new.png') });
    
    const html = await page.content();
    require('fs').writeFileSync(path.join(__dirname, 'login_new.html'), html);
    
    console.log("Yeni adres başarıyla yakalandı.");
  } catch (err) {
    console.error("Hata:", err);
  } finally {
    await browser.close();
  }
}

captureNewLogin();
