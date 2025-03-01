const fetch = require('node-fetch');
const { isUrl } = require('../../lib/myfunc');

const handler = async (m, { q,hanz, args, command, prefix }) => {
    

    if (!isUrl) return m.reply(`⚠️ Masukkan link TikTok yang valid!\n\nContoh: ${prefix + command} https://vm.tiktok.com/ZSRfArwXH/`);
      

    try {
        m.reply(mess.wait);
        
        // Fetch data dari API TikTok
        const response = await fetch(`https://skizoasia.xyz/api/tiktok?url=${q}&apikey=Rangelofficial`);
        const data = await response.json();

        if (data.data.duration == 0) {
            for (const image of data.data.images) {
                await hanz.sendMessage(m.chat, { image: { url: image } }, { quoted: m });
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } else {
            // Format pesan dengan informasi musik
 const tkes = `${gris1}
🎵 ${gris}TIKTOK MUSIK${gris}

🎬 *ID:* ${data.data.id}
🌍 *Region:* ${data.data.region}
🎧 *Judul:* ${data.data.title}
⏱️ *Durasi:* ${data.data.duration} detik
🎶 *Musik:* ${data.data.music}

🎼 ${gris}Info Musik:${gris}
🎤 *Judul:* ${data.data.music_info.title}
🎧 *Author:* ${data.data.music_info.author}

📊 ${gris}Statistik Musik:${gris}
👁️ *Diputar:* ${data.data.play_count} kali
💬 *Komentar:* ${data.data.comment_count}
🔗 *Dibagikan:* ${data.data.share_count} kali
📥 *Didownload:* ${data.data.download_count} kali ${gris1}`;


            // Kirim audio dan informasi musik
            const lagu = await hanz.sendMessage(m.chat, { audio: { url: data.data.music }, mimetype: 'audio/mp4' }, { quoted: m });
            await hanz.sendMessage(m.chat, { text: tkes }, { quoted: lagu });
        }
    } catch (err) {
        console.error(err);
        //m.reply('⚠️ Terjadi kesalahan saat memproses permintaan Anda.');
    }
};

handler.help = ['tiktokmusik <link>'];
handler.tags = ['downloader'];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["unduhan audio dari link tiktok"]
handler.command = /^(tiktokmusik|ttmp3|ttaudio)$/i;

module.exports = handler;
