const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

async function run() {
  const compUser = process.env.TUREV_COMPANY_USERNAME;
  const compPass = process.env.TUREV_COMPANY_PASSWORD;
  const userUser = process.env.TUREV_USER_USERNAME;
  const userPass = process.env.TUREV_USER_PASSWORD;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('http://turev5.turevrac.com/Login.aspx', { timeout: 30000 });
    await page.fill('#TextBoxKll', compUser);
    await page.fill('#TextBoxSfr', compPass);
    await page.click('#Button1');
    
    await page.waitForSelector('#TextBoxPr_Kll', { timeout: 15000 });
    await page.fill('#TextBoxPr_Kll', userUser);
    await page.fill('#TextBoxPr_Pass', userPass);
    await page.click('#Button2');
    
    await page.waitForTimeout(10000);
    
    console.log('Kiradaki araçlar sayfasına gidiliyor...');
    await page.goto('http://turev5.turevrac.com/Kira_Listesi.aspx?Kira_Durum=Kirada&TarihX=0', { timeout: 30000 });
    await page.waitForTimeout(5000);
    
    const html = await page.content();
    require('fs').writeFileSync(path.join(__dirname, 'rented_cars_dump.html'), html);
    await page.screenshot({ path: path.join(__dirname, 'rented_cars.png'), fullPage: true });

    
    console.log('Bitti.');
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await browser.close();
  }
}

run();
