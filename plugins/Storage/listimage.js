const fs = require("fs");

let handler = async (m, { setReply }) => {
  // Membaca data gambar yang ada
  const imagenya = JSON.parse(fs.readFileSync('./json/image.json'));

  // Menyusun daftar gambar
  let teks = '*Daftar Gambar:*\n\n';
  for (let image of imagenya) {
    teks += `- ${image}\n`;
  }
  teks += `\n*Total: ${imagenya.length} gambar*`;
  teks += `\n\n*Untuk mengambil gambar, silakan ketik nama gambar.*`;

  // Mengirim daftar sebagai balasan
  setReply(teks);
};

handler.command = ["listimage"];
handler.owner = true;

module.exports = handler;
