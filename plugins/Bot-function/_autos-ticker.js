const fs = require("fs-extra");

let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  var autoSticker = db.data.settings['settingbot'].autoSticker;
  let mime = (m.msg || m).mimetype || '';

  if (autoSticker) {
   
    const isSticker = m.type === 'stickerMessage';
    if (isSticker) {
      return;  
    }

   
    const isImage = m.type === 'imageMessage';
    if (isImage) {
      let media = await m.download(); 
      m.reply('Auto Sticker Detected');
      
      try {
       
        let encmedia = await hanz.sendImageAsSticker(m.chat, media, m, { packname: global.packName, author: m.pushname });
        await fs.unlinkSync(encmedia);
      } catch (error) {
        m.reply('Gagal membuat stiker dari gambar.');
        console.error(error);
      }
    }
    
   
    const isVideo = m.type === 'videoMessage';
    if (isVideo) {
      if ((m.msg || m).seconds > 7) return m.reply('Maksimal durasi video adalah 7 detik!');
      let media = await m.download(); 
      m.reply('Proses membuat stiker...');
      
      try {
       
        let encmedia = await hanz.sendVideoAsSticker(m.chat, media, m, { packname: global.packName, author: m.pushname });
        await fs.unlinkSync(encmedia);  
      } catch (error) {
        m.reply('Gagal membuat stiker dari video.');
        console.error(error);
      }
    }

   
    const isViewOnce = m.type === 'viewOnceMessage';
    if (isViewOnce) {
      let media = await m.download(); 
      m.reply('Proses membuat stiker dari view once...');

      try {
       
        if (/image/.test(mime)) {
          let encmedia = await hanz.sendImageAsSticker(m.chat, media, m, { packname: global.packName, author: m.pushname });
          await fs.unlinkSync(encmedia);  
        } else if (/video/.test(mime)) {
          if ((m.msg || m).seconds > 7) return m.reply('Maksimal durasi video adalah 7 detik!');
          let encmedia = await hanz.sendVideoAsSticker(m.chat, media, m, { packname: global.packName, author: m.pushname });
          await fs.unlinkSync(encmedia);  
        }
      } catch (error) {
        m.reply('Gagal membuat stiker dari view once.');
        console.error(error);
      }
    }
  }
};

module.exports = handler;
        