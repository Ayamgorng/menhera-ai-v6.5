const axios = require('axios');



const handler = async (m, { hanz, text, usedPrefix, command }) => {
    if (!text) throw `*Contoh:* ${usedPrefix + command} https://example.com`;
m.reply('_Sedang Di Proses_\n_Ini Membutuhkan Waktu Beberapa Saat_')
    try {
        const screenshot = await sswebvideo(text);

       
        await hanz.sendFile(m.chat, screenshot, 'screenshot.mp4', 'Here is your video screenshot', m);
    } catch (error) {
        m.reply(error.message);
    }
};

handler.tags = ['tools'];
handler.help = ['sswebvideo <link>'];
handler.command = ['ssvideo','sswebvideo']
handler.limit = true;

module.exports = handler;

async function sswebvideo(url) {
    try {
        const response = await axios.post(
            'https://tella.mockso-cloud.com/screenshot/video',
            { url },
            { responseType: 'arraybuffer' }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to take a screenshot of the video. Please try again.");
    }
}