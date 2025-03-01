const axios = require('axios');

let handler = async (m, { args,hanz,sendSticker,otw }) => {
    if (!args[0]) return m.reply('Masukkan link TikTok! Contoh: .tiktok https://vt.tiktok.com/ZS24ShS1n/');
    const url = args[0];
    if (!url.match(/(https:\/\/vt.tiktok.com\/|https:\/\/www.tiktok.com\/)/gi)) {
        return m.reply('Masukkan link TikTok yang valid.');
    }
sendSticker(otw)
    try {
        const response = await axios.get(`https://api.agatz.xyz/api/tiktok?url=${encodeURIComponent(url)}`);
        const data = response.data.data;
        const {
            title,
            author,
            stats,
            music_info,
            cover,
            data: videoData
        } = data;
        const nowatermarkUrl = videoData.find(item => item.type === 'nowatermark')?.url;
        const musicUrl = music_info.url;
        let message = `${gris1}*TikTok Video Download (No Watermark)*\n\n`;
        message += `*Judul*: ${title}\n`;
        message += `*Author*: ${author.fullname} (@${author.nickname})\n`;
        message += `*Views*: ${stats.views} | *Likes*: ${stats.likes}\n`;
        message += `*Music*: ${music_info.title} by ${music_info.author}${gris1}\n\n`;
       // await m.reply(message);
        if (nowatermarkUrl) {
            await hanz.sendMessage(m.chat, { video: { url: nowatermarkUrl }, caption: message });
        } else if (cover) {
            await hanz.sendMessage(m.chat, { image: { url: cover }, caption: `*Cover Image for*: ${title}` });
        } else {
            return m.reply('Video atau cover tidak tersedia untuk diunduh.');
        }
        if (musicUrl) {
            await hanz.sendMessage(m.chat, { audio: { url: musicUrl }, mimetype: 'audio/mp4', fileName: `${music_info.title}.mp3` },{quoted:m});
        } else {
            m.reply('Audio tidak tersedia.');
        }
    } catch (error) {
        console.error("Error fetching TikTok video:", error);
        m.reply('Terjadi kesalahan saat mengunduh video TikTok.');
    }
};


handler.help = ['tiktok <link>'];
handler.tags = ['downloader'];
handler.limit = true
handler.command = ["tiktok","tt"]

module.exports = handler;
