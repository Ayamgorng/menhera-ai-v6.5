const fs = require('fs');
const axios = require('axios');
const { generateMessageIDV2 } = require('baileys');
const { randomBytes } = require('crypto');

const LIMIT_RESET_HOURS = 6;
const MAX_LIMIT = 50;

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
  "tebaklogo",
  "tebakkata",
  "tebaklirik",
  "siapaaku",
  "tebakgambar",
  "family",
  "tebakbom",
  "bj",
  "war",
];
for (let game of gameList) {
  hanz[game] = hanz[game] ? hanz[game] : {};
}
for (let game of gameList) {
  if (m.chat in hanz[game] || m.key.fromMe || m.isBaileys || m.isGroup) {
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
    
   
    const userId = m.sender;
    const now = Date.now();

    hanz.aiPrivate = hanz.aiPrivate || {};
    if (!hanz.aiPrivate[userId]) {
        hanz.aiPrivate[userId] = {
            limit: MAX_LIMIT,
            lastReset: now,
        };
    }

    const userSession = hanz.aiPrivate[userId];

    // Reset limit jika sudah melewati waktu reset
    if (now - userSession.lastReset >= LIMIT_RESET_HOURS * 60 * 60 * 1000) {
        userSession.limit = MAX_LIMIT;
        userSession.lastReset = now;
    }

    const isCmd = m.body.startsWith(prefix);
    if (isCmd) return;
    if (m.key?.remoteJid === 'status@broadcast') return;
    
    

    
    if (userSession.limit <= 0) {
        return hanz.sendMessage(
            m.chat,
            { text: `Limit Chat Ai Anda sudah habis. Silakan tunggu hingga limit direset.` },
            { quoted: m }
        );
    }

    const replyAi = async (text) => {
        try {
            userSession.limit -= 1;
            const theArray = [
                {
                    attrs: { biz_bot: '1' },
                    tag: "bot"
                },
                {
                    attrs: {},
                    tag: "biz"
                }
            ];
            const gen = {
                conversation: text,
                messageContextInfo: {
                    messageSecret: randomBytes(32),
                    supportPayload: JSON.stringify({
                        version: 1,
                        is_ai_message: true,
                        should_show_system_message: true,
                        ticket_id: "1669945700536053",
                    }),
                },
            };

            hanz.relayMessage(m.chat, gen, {
                messageId: generateMessageIDV2(hanz.user.id),
                additionalNodes: theArray
            });
        } catch (error) {
            console.error("Error saat membalas:", error);
        }
    };

    try {
        const isImageRequest = /(gambar|buat gambar|generate gambar)/i.test(m.body);

        if (isImageRequest) {
            const textPrompt = m.body.replace(/(gambar|buat gambar|generate gambar)/i, "").trim();
            const urlImg = `https://btch.us.kg/dalle?text=${encodeURIComponent(textPrompt)}`;

            try {
                await hanz.sendMessage(m.chat, {
                    image: { url: urlImg },
                    caption: `Hasil gambar untuk: ${textPrompt || "tanpa deskripsi"}`
                }, { quoted: m });
            } catch (error) {
                console.error(error);
                await hanz.sendMessage(m.chat, {
                    text: "Terjadi kesalahan saat membuat gambar."
                }, { quoted: m });
            }
        } else {
            const apiUrl = `https://gemini-api-5k0h.onrender.com/gemini/chat`;
            const params = { q: m.body };

            const response = await axios.get(apiUrl, { params });
            const replyText = response.data?.content || 'Gagal mendapatkan respons AI.';
            await replyAi(replyText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

module.exports = handler;