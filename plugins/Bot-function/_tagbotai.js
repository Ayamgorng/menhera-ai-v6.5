const fs = require("fs");
const fetch = require("node-fetch");
const axios = require("axios"); // Pastikan axios di-install

const handler = (m) => m;

handler.before = async function (m, { hanz, text, command }) {
   
    const Input = m.mentionByTag && m.mentionByTag[0] ? m.mentionByTag[0].replace('@s.whatsapp.net', '') : null;

 
    if (!Input) return;

   
    const botNumber = m.botNumber.replace('@s.whatsapp.net', '');
    if (Input === botNumber) {
        let kata = m.body.replace(`@${botNumber}`, "").trim();
const testai = {
    key: {
        fromMe: false,
        participant: `13135550002@s.whatsapp.net`, // Nomor MetaAI
        remoteJid: `${m.chat}` // ID chat grup atau pribadi
    },
    message: {
        contactMessage: {
            displayName: `@Meta AI ${kata}`, // Nama kontak
            vcard: `BEGIN:VCARD
VERSION:3.0
N:Meta AI;;;;
FN:Meta AI
item1.TEL;waid=13135550002:13135550002
item1.X-ABLabel:Ponsel
END:VCARD`
        }
    }
};
       
        const isImageRequest = /(gambar|buat gambar|generate gambar)/i.test(kata);
        const isVideoRequest = /(video|cari video|play video)/i.test(kata);

        if (isImageRequest) {
      
            const textPrompt = kata.replace(/(gambar|buat gambar|generate gambar)/i, "").trim();
            const urlImg = `https://btch.us.kg/dalle?text=${encodeURIComponent(textPrompt)}`;
            
            try {
                await hanz.sendMessage(m.chat, { 
                    image: { url: urlImg }, 
                    caption: `Hasil gambar untuk: ${textPrompt || "tanpa deskripsi"}`
                }, { quoted: m });
            } catch (error) {
                console.error(error);
                await hanz.sendMessage(m.chat, { 
                    text: "Terjadi kesalahan saat membuat gambar." 
                }, { quoted: m });
            }
        } else if (isVideoRequest) {
      
            const query = kata.replace(/(video|cari video|play video)/i, "").trim();
            if (!query) {
                await hanz.sendMessage(m.chat, { text: "Silakan masukkan kata kunci untuk mencari video." }, { quoted: m });
                return;
            }

            try {
                const video = await searchVid(query);
                const message = `🎥 Berikut Video Yang Saya Temukan`;
                
          
                await hanz.sendMessage(m.chat, { 
                    video: { url: video.no_watermark }, 
                    caption: message 
                }, { quoted: m });
            } catch (error) {
                console.error(error);
                await hanz.sendMessage(m.chat, { 
                    text: `Terjadi kesalahan: ${error.message || "Gagal mencari video."}` 
                }, { quoted: m });
            }
        } else {
          
            const url = `https://www.tanakadomp.biz.id/api/openai/open-ai?q=${encodeURIComponent(kata)}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.status) {
                    await hanz.sendMessage(
            m.key.remoteJid,
            { text: `${data.message}` },
            {
                quoted: testai,
                contextInfo: {
                    mentionedJid: ['13135550002@s.whatsapp.net'] 
                }
            }
        );
                } else {
                    await hanz.sendMessage(m.chat, { text: "AI gagal memberikan respons." }, { quoted: m });
                }
            } catch (error) {
                console.error(error);
                await hanz.sendMessage(m.chat, { 
                    text: `Hai ${m.pushname} ada yang bisa saya bantu`
                }, { quoted: m });
            }
        }
    }
};

module.exports = handler;


async function searchVid(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://tikwm.com/api/feed/search',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': 'current_language=en',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
                },
                data: new URLSearchParams({
                    keywords: query,
                    count: 10,
                    cursor: 0,
                    HD: 1
                })
            });

            const videos = response.data.data.videos;
            if (!videos || videos.length === 0) {
                reject("Tidak ada video ditemukan.");
            } else {
                const randomIndex = Math.floor(Math.random() * videos.length);
                const video = videos[randomIndex];

                const result = {
                    title: video.title || "Tanpa judul",
                    cover: video.cover,
                    origin_cover: video.origin_cover,
                    no_watermark: video.play,
                    watermark: video.wmplay,
                    music: video.music
                };
                resolve(result);
            }
        } catch (error) {
            reject(error.response?.data?.message || error.message || "Terjadi kesalahan pada API TikWM.");
        }
    });
}