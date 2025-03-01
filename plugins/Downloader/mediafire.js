const { mediafiredll } = require('../../lib/scraper'); 
const { filesize,getBuffer } = require('../../lib/myfunc'); 

let handler = async (m, { q, text, hanz }) => {
    if (!q) return m.reply('Link-nya mana?');

    if (q.startsWith("https://www.mediafire.com")) {
        try {
           
            let nana = await mediafiredll(q);
            console.log(nana); 
            let image = { url: "https://telegra.ph/file/0a45359703b3a8fdffb8c.jpg" };

          
            let teks = `*乂 Mediafire Downloader*

📂 File Name: ${nana.name}
📄 File Size: ${nana.size}  
🌐 Upload: ${nana.date}
🧷 Link : ${nana.link}

*_Tunggu sebentar ya kak, sedang mengirim file!*`;

          
            const contextInfo = {
                mentionedJid: [m.sender],
                externalAdReply: {
                    showAdAttribution: true,
                    title: "Mediafire File",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: image.url,
                    sourceUrl: `${nana.link}`
                }
            };

          
            await hanz.sendMessage(m.chat, { text: teks, contextInfo }, { quoted: m });

          
            if (nana.filesize > 400000 && !m.isOwner) {
                if (m.sender.startsWith("62")) {
                    return m.reply("File size melebihi batas,\nbatas yang ditentukan adalah 400MB");
                }
            }

           var media = await getBuffer(nana.link)
 await hanz.sendMedia (m.chat, media, m, {fileName: nana.name})       

           

        } catch (error) {
            console.error("Error while processing Mediafire file:", error);
            m.reply("Maaf, terjadi kesalahan saat mengambil file dari Mediafire.");
        }
    }
};

handler.command = ['mf','mediafire']; 
handler.tags = ['downloader'];
handler.help = ['mediafire <url>'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["unduhan mediafire"]
module.exports = handler;
