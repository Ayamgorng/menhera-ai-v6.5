const axios = require('axios');

let handler = async (m, { args,prefix,hanz }) => {
   
    if (m.isGroup) return m.reply('Hanya untuk percakapan pribadi.');

    if (args[0] && args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {
        let xeonresources = await Telesticker(args[0]);
        await m.reply(`Waitt Mengirim ${xeonresources.length} stiker...`);


        if (m.isGroup && xeonresources.length > 30) {
            await m.reply('Jumlah stiker lebih dari 30, bot akan mengirimkannya dalam obrolan pribadi.');
            for (let i = 0; i < xeonresources.length; i++) {
                await hanz.sendMessage(m.sender, { sticker: { url: xeonresources[i].url } });
            }
        } else {
            for (let i = 0; i < xeonresources.length; i++) {
                await hanz.sendMessage(m.chat, { sticker: { url: xeonresources[i].url } });
            }
        }
    } else {
        m.reply(`Di mana link stiker Telegram?\nContoh: .telegramsticker https://t.me/addstickers/FriendlyDeath`);
    }
};


handler.help = ['telegramsticker <link>'];
handler.tags = ['sticker'];
handler.limit = true
handler.command = ['telegramsticker','telestick'];
handler.noCmdStore = true  

module.exports = handler;


async function Telesticker(url) {
    return new Promise(async (resolve, reject) => {
        if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) return reject('Masukkan link stiker Telegram yang valid.');

        const packName = url.replace("https://t.me/addstickers/", "");
        try {
            const response = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {
                headers: { "User-Agent": "GoogleBot" }
            });

            const xeonyresult = [];

            for (let sticker of response.data.result.stickers) {
                const fileId = sticker.thumb.file_id;
                const fileResponse = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`);
                const result = {
                    status: 200,
                    author: 'DGXeon',
                    url: `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${fileResponse.data.result.file_path}`
                };
                xeonyresult.push(result);
            }

            resolve(xeonyresult);
        } catch (error) {
            console.error("Error fetching stickers:", error);
            reject('Terjadi kesalahan saat mengambil stiker.');
        }
    });
}

// Export the handler for use in other modules

        
        