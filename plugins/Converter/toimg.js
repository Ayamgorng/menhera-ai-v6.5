const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc'); 

const handler = async (m, { hanz, setReply }) => {
 
  const isQuotedSticker = m.quoted && m.quoted.mtype === 'stickerMessage';
const quoted = m.quoted ? m.quoted : m
  if (!isQuotedSticker) {
    return setReply('Reply stickernya');
  }

  try {
    setReply('Proses mengubah sticker menjadi gambar...');


    let media = await hanz.downloadAndSaveMediaMessage(quoted);

  
    let ran = getRandom('.png');
    
 
    exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
      fs.unlinkSync(media); 

      if (err) {
        return setReply(`Terjadi kesalahan: ${err.message}`);
      }

   
      let buffer = fs.readFileSync(ran);
      
   
      await hanz.sendMessage(m.chat, {
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: `${botName}`,
            mediaType: 3,
            renderLargerThumbnail: false,
            thumbnailUrl: `${getRandom(fotoRandom)}`, 
            sourceUrl: `https://wa.me/${nomerOwner}` 
          }
        },
        image: buffer,
        caption: `${mess.success}` 
      }, { quoted: m });

    
      fs.unlinkSync(ran);
    });
  } catch (e) {
    console.error(e);
    setReply('Terjadi kesalahan saat mengonversi sticker!');
  }
};

handler.help = ['toimg'];
handler.command = ['toimg'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["ubah sticker jadi image"]

module.exports = handler;
