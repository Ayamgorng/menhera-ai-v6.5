const fs = require('fs');
const axios = require('axios');
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

const handler = async (m, { hanz, args, text, usedPrefix, command, prefix }) => {
    text = text || (m.quoted && (m.quoted.text || m.quoted.caption || m.quoted.description));
    if (!text) throw `*• Example:* ${usedPrefix + command} *[text]*`;

    
    const rulz = `https://api.zenkey.my.id/api/maker/brat?text=${encodeURIComponent(text)}&apikey=zenkey`;

    try {
        const res = await axios.get(rulz, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(res.data, 'binary');

        await hanz.sendImageAsSticker(m.chat, buffer, m, { 
            packname: packName, 
            author: m.pushname
        });
    } catch (e) {
        console.error('Error:', e.message);
        throw '*• Error generating sticker. Please try again later.*';
    }
};

handler.command = handler.help = ['brat'];
handler.tags = ['sticker'];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;