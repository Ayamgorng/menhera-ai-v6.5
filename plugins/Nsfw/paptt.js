const fs = require('fs');

let handler = async (m, { hanz, q,command, args, setReply }) => {
  
  
  if (!q) return setReply(`Contoh Penggunaan:\n${command} foto/video`);

  // Membaca data dari JSON file
  let papttfoto = JSON.parse(fs.readFileSync('./json/paptt-foto.json'));
  let papttvideo = JSON.parse(fs.readFileSync('./json/paptt-video.json'));

  // Fungsi untuk mengambil item secara acak dari array
  const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  let titid1 = pickRandom(papttfoto);
  let titid2 = pickRandom(papttvideo);

  if (q === 'foto') {
    setReply("Foto Akan Dikirim Lewat Private Chat ( *PC* )");
    hanz.sendMessage(m.sender, { image: { url: titid1 }, caption: 'Mana Tahan😛' }, { quoted: m });
  } else if (q === 'video') {
    setReply("Video Akan Dikirim Lewat Private Chat ( *PC* )");
    hanz.sendMessage(m.sender, { video: { url: titid2 }, caption: 'Mana Tahan🙈' }, { quoted: m });
  } else {
    setReply("Tipe tidak valid, pilih antara 'foto' atau 'video'.");
  }
};

handler.help = ['paptt'];
handler.command = ['paptt'];
handler.tags = ['nsfw'];
handler.nsfw = true
handler.noCmdStore = true  

module.exports = handler;
