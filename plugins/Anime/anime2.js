const axios = require('axios');
const fetch = require('node-fetch');

const handler = async (m, { hanz, command, isGroup, isPremium, sender }) => {
    

    m.reply(mess.wait);
    
    try {
        const response = await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/${command}.json`);
        const imageUrlList = response.data;
        const randomImage = imageUrlList[Math.floor(Math.random() * imageUrlList.length)];
        const imageBuffer = await (await fetch(randomImage)).buffer();
        await hanz.sendMessage(m.chat, { 
            image: imageBuffer,
            caption: `_${command}_`,
            footer: `Hasil pencarian dari ${command}`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: 'Wibu Bot',
                    mediaType: 3,
                    renderLargerThumbnail: false,
                    thumbnailUrl: `*{getRandom(fotoRandom)`,
                    sourceUrl: `https://wa.me/${global.nomerOwner}`
                }
            }
        }, { quoted: m });
        
      
    } catch (err) {
        console.error(err);
        conn.reply(m.chat, '⚠️ Server sedang error, coba lagi besok!', m);
    }
};

handler.help = ['loli', 'cosplay', 'husbu', 'milf', 'wallml'];
handler.tags = ['anime'];
handler.command = /^(loli|cosplay|husbu|milf|wallml)$/i;
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["kumpulan gambar anime"]
module.exports = handler;
