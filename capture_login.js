const { chromium } = require('playwright');
const path = require('path');

async function takeScreenshot() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log("Sayfaya gidiliyor...");
  await page.goto('https://turev2.turevcar.com/Login.aspx');
  
  console.log("Ekran görüntüsü alınıyor...");
  await page.screenshot({ path: path.join(__dirname, 'login_step1.png') });
  
  const html = await page.content();
  require('fs').writeFileSync(path.join(__dirname, 'login_step1.html'), html);
  
  await browser.close();
  console.log("Bitti.");
}

takeScreenshot();
