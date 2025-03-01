const fetch = require('node-fetch'); // Pastikan node-fetch sudah terinstal
const fs = require('fs');
const path = require('path');

const handler = async (m, { q, hanz, args, command, prefix, sendSticker, otw }) => {
  try {
    // Jika tidak ada query, berikan teks default
    const text = q || 'rumah hantu';

    // Memanggil API yang mengembalikan gambar
    let response = await fetch(`https://btch.us.kg/dalle?text=${encodeURIComponent(text)}`, {
      method: 'GET',
      headers: {
        'accept': 'image/jpeg',
      },
    });

    // Mengecek jika respons berhasil
    if (!response.ok) {
      throw new Error('Gagal mendapatkan gambar dari API');
    }

    // Menyimpan gambar sementara di server
    const buffer = await response.buffer();
    const imagePath = path.join(__dirname, 'temp_image.jpg'); // Menyimpan gambar di direktori sementara
    fs.writeFileSync(imagePath, buffer);

    // Mengirim gambar kepada pengguna
    await hanz.sendMessage(m.chat,{ 
      image: { url: imagePath }, 
      caption: `Hasil gambar untuk: ${text}`
    });

    // Menghapus gambar setelah mengirimnya untuk menghemat ruang
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat mengakses API DALL·E atau mengunduh gambar.');
  }
};

handler.help = ['dalle'];
handler.tags = ['ai'];
handler.command = /^(dalle)$/i;
handler.noCmdStore = true;
handler.onlyGroup = false;
handler.description = ["Menghasilkan gambar menggunakan DALL·E dari API"];

module.exports = handler;