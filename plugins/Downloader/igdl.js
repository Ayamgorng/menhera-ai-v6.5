const axios = require("axios");
const cheerio = require("cheerio");
let handler = async (m, { text, hanz }) => {
  async function igdl(instagramUrl) {
    try {
      const response = await axios.post(
        "https://api.downloadgram.org/media",
        new URLSearchParams({ url: instagramUrl }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.163 Mobile Safari/537.36",
          },
        }
      );
      const $ = cheerio.load(response.data);
      let downloadLink = $("a").attr("href"); 
      if (downloadLink) {
        const videoUrl = downloadLink.replace(/\\"/g, '');
        return videoUrl; 
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
      return null; 
    }
  }
  if (text) {
    const instagramUrl = text.trim(); 
    const videoUrl = await igdl(instagramUrl); 
    if (videoUrl) {
      await hanz.sendMessage(m.chat, {
        video: { url: videoUrl },
        caption: "nih kak",
      },{quoted:m});
    } else {
      m.reply("Tidak dapat menemukan video atau terjadi kesalahan.");
    }
  } else {
    m.reply("Silakan kirim URL Instagram.");
  }
};

handler.command = ['ig','igdl','instagram']
handler.help = ["igdl <url>"];
handler.tags = ["downloader"];

module.exports = handler;