const fs = require("fs");

let handler = async (m, { setReply }) => {
  // Membaca data video yang ada
  const videonya = JSON.parse(fs.readFileSync('./json/video.json'));

  // Menyusun daftar video
  let teks = '*Daftar Video:*\n\n';
  for (let video of videonya) {
    teks += `- ${video}\n`;
  }
  teks += `\n*Total: ${videonya.length} video*`;
  teks += `\n\n*Untuk mengambil video, silakan ketik nama video.*`;

  // Mengirim daftar sebagai balasan
  setReply(teks);
};

handler.command = ["listvideo"];
handler.owner = true;

module.exports = handler;
