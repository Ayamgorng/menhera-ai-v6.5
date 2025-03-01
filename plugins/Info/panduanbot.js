let handler = async (m, { setReply }) => {

  let teksPanduanBot = `
  Hai ${m.pushname} 😊

  Terima kasih telah menggunakan Bot Menhera! 🎉
  
  Berikut adalah panduan singkat untuk memaksimalkan penggunaan bot WhatsApp ini:

  📌 **Pengaturan Awal**:
  Setelah mengaktifkan bot, pastikan untuk memeriksa menu *Settings* untuk melihat berbagai opsi yang dapat disesuaikan. Ini termasuk pengaturan bot agar lebih sesuai dengan kebutuhan Anda.

  🔧 **Fitur yang Tersedia**:
  Bot Menhera menawarkan banyak fitur menarik yang dapat digunakan, termasuk pengaturan notifikasi, pengelolaan pesan otomatis, dan banyak lagi!

  ❓ **Ada pertanyaan?** 
  Jika ada yang kurang atau Anda membutuhkan bantuan lebih lanjut, jangan ragu untuk bertanya atau cek kembali panduan kami.

  🌟 **Semoga Pengalaman Anda Menyenangkan!**

  *Dari Tim Rangelofficial*

  🔗 **Untuk melihat pengaturan bot, ketik**: .menu settings & .example
  📜 Untuk bantuan lebih lanjut, cukup ketik .panduanbot atau hubungi kami kapan saja.
  `;

  setReply(teksPanduanBot);
};

handler.help = ["intro"];
handler.tags = ["group"];
handler.command = ["panduanbot"];


module.exports = handler;