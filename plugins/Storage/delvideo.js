const fs = require("fs");

let handler = async (m, { q, setReply }) => {
  // Membaca data video yang ada
  const videonya = JSON.parse(fs.readFileSync('./json/video.json'));

  
  if (!q) return setReply("Masukkan nama video yang ingin dihapus.");

  try {
    // Cari dan hapus video dari daftar
    let index = videonya.indexOf(q);
    if (index === -1) return setReply(`Video dengan nama *${q}* tidak ditemukan.`);

    videonya.splice(index, 1);
    fs.writeFileSync('./json/video.json', JSON.stringify(videonya, null, 2));

    // Hapus file video dari folder
    fs.unlinkSync(`./temp/video/${q}.mp4`);
    
    setReply(`Berhasil menghapus video dengan nama *${q}*`);
  } catch (error) {
    console.error(error);
    setReply(`Gagal menghapus video dengan nama *${q}*`);
  }
};

handler.command = ["delvideo"];
handler.owner = true;

module.exports = handler;
