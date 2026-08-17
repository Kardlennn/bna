const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'C:\\Users\\ELITEBOOK\\Desktop\\Yeni Klasör (3)';
const outputDir = path.resolve(__dirname, 'public', 'cars');

async function processImages() {
  try {
    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));
    console.log(`Bulunan resim sayısı: ${files.length}`);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const inputPath = path.join(inputDir, file);
      const filename = path.parse(file).name;
      const outputPath = path.join(outputDir, `${filename}.webp`);

      const metadata = await sharp(inputPath).metadata();
      
      // Bottom 60 pixels removed
      const cropHeight = metadata.height - 60;
      
      await sharp(inputPath)
        .extract({ left: 0, top: 0, width: metadata.width, height: cropHeight })
        .resize({ width: 800 }) // Web optimizations
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      console.log(`${file} işlendi -> ${i + 1}.webp`);
    }
    
    console.log('Tüm resimler başarıyla işlendi ve watermarklar kaldırıldı!');
  } catch (error) {
    console.error('Hata:', error);
  }
}

processImages();
