const fs = require('fs');
const path = require('path');

// Dosya yükleme fonksiyonu
async function uploadFile(file, uploadDir) {
  if (!file) {
    throw new Error('File not found.');
  }

  // Yükleme dizini yoksa oluştur
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Dosya uzantısını al
  const fileExtension = path.extname(file.name);

  // Yeni dosya ismi oluştur (örneğin timestamp ile)
  const newFileName = `${Date.now()}${fileExtension}`;

  // Yeni dosya yolunu oluştur
  const uploadPath = path.join(uploadDir, newFileName);

  // Dosyayı belirtilen yola kaydet
  await file.mv(uploadPath);

  // Dosyanın veritabanında kaydedilecek yolunu döndür
  return `images/${newFileName}`;
}

module.exports = uploadFile;