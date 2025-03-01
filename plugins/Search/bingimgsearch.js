const axios = require("axios");
const cheerio = require("cheerio");

const bingImageSearch = async (query) => {
  const searchQuery = encodeURIComponent(query);
  const url = `https://www.bing.com/images/search?q=${searchQuery}`;

  try {
  
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

  
    const $ = cheerio.load(response.data);
    const imageUrls = [];

   
    $('img.mimg').each((i, el) => {
      const imgSrc = $(el).attr('src');
      if (imgSrc && imgSrc.startsWith('https')) {
        imageUrls.push(imgSrc);
      }
    });

    if (imageUrls.length > 0) {
      return imageUrls; 
    } else {
      return "Tidak ada gambar yang ditemukan.";
    }
  } catch (error) {
    console.error("Error scraping Bing Image:", error);
    return "Terjadi kesalahan saat mengambil gambar dari Bing.";
  }
};

let handler = async (m, { text, command }) => {
  if (!text) return m.reply("Tolong beri saya kata kunci pencarian!");

  try {
    const imageUrls = await bingImageSearch(text);
    if (Array.isArray(imageUrls)) {
      let message = 'Gambar ditemukan:\n';
      imageUrls.slice(0, 5).forEach((url, index) => {
        message += `${index + 1}: ${url}\n`; 
      });
      m.reply(message);
    } else {
      m.reply(imageUrls); 
    }
  } catch (error) {
    console.error("Error:", error);
    m.reply("Terjadi kesalahan saat mencari gambar.");
  }
};

handler.help = ["bingimgsearch"];
handler.tags = ["internet", "image"];
handler.command = ["bingimgsearch"];

module.exports = handler;