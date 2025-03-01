const axios = require('axios');

let handler = async (m, { hanz, setReply, command }) => {
  try {
    setReply('Sedang mengambil gambar...'); // Pesan loading

    // URL API berdasarkan command
    let apiUrl;
    switch (command) {
      case 'trap':
        apiUrl = `https://waifu.pics/api/nsfw/${command}`;
        break;
      case 'hneko':
        apiUrl = `https://waifu.pics/api/nsfw/neko`;
        break;
      case 'nwaifu':
        apiUrl = `https://waifu.pics/api/nsfw/waifu`;
        break;
      case 'animespank':
        apiUrl = `https://nekos.life/api/v2/img/spank`;
        break;
      default:
        return setReply("Perintah tidak dikenali.");
    }

    // Mengambil data dari API
    const { data } = await axios.get(apiUrl);
    
    // Mengirim pesan dengan gambar
    await hanz.sendMessage(m.chat, { caption: 'Dosa Tanggung Sendiri', image: { url: data.url } }, { quoted: m });
  } catch (error) {
    console.error(error);
    setReply("Terjadi kesalahan saat mengambil gambar.");
  }
};

// Properti plugin
handler.help = ['trap', 'hneko', 'nwaifu', 'animespank'];
handler.command = ['trap', 'hneko', 'nwaifu', 'animespank'];
handler.tags = ['nsfw'];
handler.premium = true;
handler.nsfw = true;
handler.noCmdStore = true  

module.exports = handler;
