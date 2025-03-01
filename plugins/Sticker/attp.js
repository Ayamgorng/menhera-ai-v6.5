const fetch = require("node-fetch");
const fs = require("fs");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

let handler = async (m, { q, hanz }) => {
  if (!q) return m.reply("Masukan teks");

  try {
    
    const url = `https://aemt.uk.to/attp?text=${encodeURIComponent(q)}`;

    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'image/gif'
      }
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

     const gifBuffer = await response.buffer();

      let sticker = new Sticker(gifBuffer, {
      pack: botName,
      author: m.pushname, 
      type: StickerTypes.FULL,
      quality: 70, 
      background: '#FFFFFF00' 
    });

   
    let randomFileName = getRandom(".webp");
    await sticker.toFile(randomFileName);

   
    let webpSticker = fs.readFileSync(randomFileName);

    
    await hanz.sendMessage(m.chat, { sticker: webpSticker }, { quoted: m });

   
    await fs.unlinkSync(randomFileName);
  } catch (error) {
   
    m.reply('Ada yang salah saat membuat sticker! Silakan coba lagi.');
    console.error('Error:', error.message); 
  }
};


function getRandom(ext) {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
}

handler.help = ["attp"];
handler.tags = ["internet", "media"];
handler.command = ["attp"];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
