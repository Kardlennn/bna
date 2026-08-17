const cron = require('node-cron');
const { exec } = require('child_process');

console.log('Bot Daemon başlatıldı! Her 1 dakikada bir TürevRent kontrol edilecek...');

// Her dakika çalışacak cron job
cron.schedule('* * * * *', () => {
  console.log(`[${new Date().toLocaleTimeString()}] Araç senkronizasyonu başlatılıyor...`);
  
  const command = `npx ts-node src/scripts/syncCars.ts`;
  
  exec(command, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`[HATA] Senkronizasyon başarısız: ${error.message}`);
      return;
    }
    if (stderr && !stderr.includes('Debugger attached')) {
      console.error(`[UYARI]: ${stderr}`);
    }
    console.log(`[BAŞARILI] Araç listesi güncellendi!`);
  });
});
