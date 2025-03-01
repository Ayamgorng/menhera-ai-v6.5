const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const fs = require('fs');
const { getRandom } = require('../../lib/myfunc'); 
const handler = async (m, { hanz, setReply, args}) => {
    try {
    const quoted = m.quoted ? m.quoted : m;
    
        if (!quoted) {
            return setReply( 'Silakan reply stiker yang ingin di-WM!');
        }

        
        let ahuh = args.join(' ').split('|');
        let satu = ahuh[0] !== '' ? ahuh[0] : 'ehanz ngewe vyna 💦';
        let dua = typeof ahuh[1] !== 'undefined' ? ahuh[1] : '';

      
        let media = await hanz.downloadAndSaveMediaMessage(quoted);

      
        let sticker = new Sticker(media, {
            pack: satu, 
            author: dua, 
            type: StickerTypes.FULL, 
            categories: ['🤩', '🎉'],
            id: '12345', 
            quality: 70, 
            background: '#FFFFFF00' 
        });

        
        let stickerFilePath = getRandom('.webp');
        await sticker.toFile(stickerFilePath);
        let stickerBuffer = fs.readFileSync(stickerFilePath);

       
        await hanz.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });

       
        fs.unlinkSync(stickerFilePath);
        fs.unlinkSync(media);

    } catch (err) {
      
        setReply( 'Ada yang salah, silakan reply stiker yang mau di-WM!');
        console.error('Error:', err.message);
    }
};


handler.help = ['stickerwm', 'take', 'wm', 'steal', 'swm'];
handler.tags = ['sticker'];
handler.command = /^(swm|steal|stickerwm|take|wm)$/i;
handler.noCmdStore = true  
handler.onlyGroup = true

module.exports = handler;
