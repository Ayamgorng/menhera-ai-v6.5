const fetch = require("node-fetch");
const uploadImage = require('../../lib/uploadImage');
const fs = require('fs');

let handler = async (m, { args, hanz }) => {
  if (!m.quoted) return m.reply("Silakan balas gambar yang ingin diubah ukurannya.");
  if (args.length < 2) return m.reply("Silakan berikan ukuran (lebar dan tinggi). Contoh: !resize <width> <height> *.resize 300 300*");

  const width = args[0]; // Lebar yang diinginkan
  const height = args[1]; // Tinggi yang diinginkan

  try {
    // Mengunduh dan menyimpan media dari pesan yang dibalas
    let mediaPath = await hanz.downloadAndSaveMediaMessage(m.quoted);
    let mediaBuffer = fs.readFileSync(mediaPath);

    // Mengupload gambar untuk mendapatkan URL
    let imageUrl = await uploadImage(mediaBuffer);

    // Membuat URL untuk mengubah ukuran
    const resizeUrl = `https://widipe.com/resize?url=${encodeURIComponent(imageUrl)}&width=${width}&height=${height}`;

    // Mengambil gambar yang telah diubah ukurannya dari URL
    const response = await fetch(resizeUrl);

    if (!response.ok) {
      throw new Error("Respon jaringan tidak baik");
    }

    // Mendapatkan buffer gambar dari respon
    const resizedImageBuffer = await response.buffer();

    // Mengirimkan gambar yang telah diubah ukurannya kembali kepada pengguna
    await hanz.sendMessage(m.chat, { image: resizedImageBuffer }, { quoted: m });
    
    // Menghapus file sementara
    fs.unlinkSync(mediaPath);
  } catch (error) {
    console.error("Error:", error.message); // Logging untuk debugging
    m.reply("Terjadi kesalahan saat memproses permintaan. Pastikan gambar dan ukuran yang diberikan benar.");
  }
};

handler.help = ["resize"];
handler.tags = ["internet", "media"];
handler.command = ["resize"]; // Perintah untuk memicu fitur ini

module.exports = handler;
