const { hentai } = require('../../lib/scraper');

let handler = async (m, { hanz, setReply }) => {
  try {
    setReply("Tunggu sebentar...");

    // Mengambil data hentai dari scraper
    let anu = await hentai();
    let result912 = anu[Math.floor(Math.random() * anu.length)];
let caption = `${gris1}Title: ${result912.title}\nCategory: ${result912.category}\nMimetype: ${result912.type}\nViews: ${result912.views_count}\nShares: ${result912.share_count}\nSource: ${result912.link}\nMedia URL: ${result912.video_1}${gris1}`
    // Mengirim pesan dengan video dan caption
    await hanz.sendMessage(m.chat, {
      video: { url: result912.video_1 },
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    setReply("Terjadi kesalahan saat mengambil video.");
  }
};

// Properti plugin
handler.help = ['hentaivid'];
handler.command = ['hentaivid'];
handler.tags = ['nsfw'];
handler.premium = true;
handler.nsfw = true;
handler.noCmdStore = true  

module.exports = handler;
