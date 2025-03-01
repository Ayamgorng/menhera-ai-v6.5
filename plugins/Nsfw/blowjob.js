const fs = require('fs');

let handler = async (m, { hanz, setReply}) => {
  // Fungsi untuk memilih item secara acak dari array
  const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  try {
      setReply(mess.wait)
    // Memuat data dari file JSON
    var ahegaonsfw = JSON.parse(fs.readFileSync('./json/nsfw/blowjob.json'));
    var xeonyresult = pickRandom(ahegaonsfw);
    
    // Mengirim pesan dengan gambar
    await hanz.sendMessage(m.chat, { caption: mess.success, image: { url: xeonyresult.url } }, { quoted: m });
  } catch (error) {
    console.error(error);
    setReply("Terjadi kesalahan saat memuat gambar.");
  }
};

handler.help = ['blowjobnsfw'];
handler.command = ['blowjob'];
handler.tags = ['nsfw'];
handler.premium = true
handler.nsfw = true
handler.noCmdStore = true  

module.exports = handler;
