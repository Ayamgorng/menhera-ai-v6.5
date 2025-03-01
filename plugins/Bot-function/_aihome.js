const fs = require('fs');
const axios = require('axios');
const { ttsAudio } = require('../../lib/scraper');

const handler = (m) => m;

handler.before = async function (m, { hanz, prefix }) {
const gameList = [
  "susunkata",
  "tekateki",
  "tebakbendera",
  "tebakkimia",
  "caklontong",
  "tebaklagu",
  "tebaktebak",
  "tebakkata",
  "tebaklirik",
  "siapaaku",
  "tebakgambar",
  "family",
  "tebakbom",
  "bj",
  "war",
  "aiPrivate"
];
for (let game of gameList) {
  hanz[game] = hanz[game] ? hanz[game] : {};
}
for (let game of gameList) {
  if (m.chat in hanz[game] || m.key.fromMe || m.isBaileys ) {
    return;
  }
}
 
if (m.type === 'videoMessage' || 
        m.type === 'stickerMessage' || 
        m.type === 'audioMessage' || 
        m.type === 'contactMessage' || 
        m.type === 'locationMessage' ||
        m.type === 'inviteLinkGroup' ||
        m.type === 'mentionedJid') {
        return;
    }
    
const isCmd = m.body.startsWith(prefix);
    if (isCmd) return;
    try {
    
        const aihomeData = JSON.parse(fs.readFileSync('./database/aihome.json', 'utf-8'));

        const groupData = aihomeData.find((group) => group.id === m.chat);

// perika bot nybmasihbada di gc nya atau enggak 
        const groupMetadata = m.isGroup ? await hanz.groupMetadata(m.chat) : null;
        if (!groupMetadata || !groupMetadata.participants.some((participant) => participant.id === hanz.user.jid)) {
            return; // kalo mggak teturn aja gak usah Respon
        }

        if (groupData && groupData.status) {
 hanz.sendMessage(groupData.id, { react: { text: '💬', key: m.key } });
            const textPrompt = groupData.promptAi;
            const content = m.text || m.message?.conversation;
            const quoted = m.quoted || m;
            const mimetype = quoted?.mimetype || quoted?.msg?.mimetype;

 
            if (mimetype && /image/.test(mimetype)) {
                try {
                 
                    const imageBuffer = await quoted.download();

                   
                    const response = await axios.post('https://luminai.my.id', {
                        imageBuffer,
                        user: groupData.id,
                        prompt: `Analisa gambar berdasarkan deskripsi berikut: ${textPrompt}`,
                    });

                   
                    if (groupData.type === 'audio') {
                       
                        const audioBuffer = await ttsAudio(response.data.result);
                        await hanz.sendMessage(
                            groupData.id,
                            { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true },
                            { quoted: m }
                        );
                    } else {
                   
                        m.reply(response.data.result);
                    }
                } catch (error) {
                    console.error("Error fetching AI image data:", error);
                    m.reply("Maaf, terjadi kesalahan saat memproses gambar. Coba lagi nanti ya!");
                }
            } else if (content) {
              
                const requestData = { content, user: groupData.id, prompt: textPrompt };

                try {
                    const response = await axios.post('https://luminai.my.id', requestData);

                    if (groupData.type === 'audio') {
                        
                        const audioBuffer = await ttsAudio(response.data.result);
                        await hanz.sendMessage(
                            groupData.id,
                            { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true },
                            { quoted: m }
                        );
                    } else {
             
                        m.reply(response.data.result);
                    }
                } catch (error) {
                    console.error("Error fetching AI text data:", error);
                    m.reply("Maaf, terjadi kesalahan saat memproses permintaan AI. Coba lagi nanti ya!");
                }
            }
        }
    } catch (error) {
        console.error("Error processing AI Home:", error);
        m.reply("Maaf, terjadi kesalahan internal. Silakan cek konfigurasi aihome.json.");
    }
};

module.exports = handler;