const axios = require('axios');

let handler = async (m, { text }) => {
  // Ambil teks setelah perintah ".morse"
 

  if (!text) {
    return m.reply("Mohon masukkan teks yang ingin dikonversi ke kode Morse!");
  }

  try {
    // Panggil API untuk mendapatkan kode Morse
    const response = await axios.get(`https://api-lenwy.vercel.app/morse?text=${encodeURIComponent(text)}`);
    const { originalText, morseCode } = response.data.data; // Dapatkan teks asli dan kode Morse

    // Kirim hasil kode Morse ke pengguna
    await m.reply(`*Teks:* ${originalText}\n*Kode Morse:* ${morseCode}`);
  } catch (error) {
    console.error("Error fetching Morse code:", error);
    await m.reply("Maaf, terjadi kesalahan saat mengambil kode Morse.");
  }
};

// Tambahkan command trigger agar handler ini merespons pada perintah ".morse"
handler.command = /^\morse/i;

module.exports = handler;
