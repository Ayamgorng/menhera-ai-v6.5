const axios = require('axios');
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require('baileys');

let handler = async (m, { hanz, args, text, usedPrefix, command }) => {
    if (!text) throw (`Contoh : ${usedPrefix + command} yang lagi viral`);
    try {
        await m.reply('Sedang mencari video...'); // Pesan sementara

        let { title, no_watermark } = await tiktoks(text);

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `\`${title}\``
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: 'Klik untuk selanjutnya'
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false,
                            ...await prepareWAMessageMedia({ video: { url: no_watermark } }, { upload: hanz.waUploadToServer })
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    "name": "quick_reply",
                                    "buttonParamsJson": `{"display_text": "Next Video", "id": ".ttsearch ${text}"}`
                                }
                            ],
                        })
                    })
                }
            }
        }, { quoted: m, userJid: m });

        hanz.relayMessage(m.chat, msg.message, {
            messageId: msg.key.id,
        });

    } catch (e) {
        throw e;
    }
};

handler.help = ["ttsearch", "ttiktoksearch"];
handler.tags = ["downloader"];
handler.command = /^(ttsearch|tiktoksearch)$/i;
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["unduhan video search dari tt"]

async function tiktoks(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://tikwm.com/api/feed/search',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': 'current_language=en',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
                },
                data: new URLSearchParams({
                    keywords: query,
                    count: 10,
                    cursor: 0,
                    HD: 1
                })
            });

            const videos = response.data.data.videos;
            if (videos.length === 0) {
                reject("Tidak ada video ditemukan.");
            } else {
                const gywee = Math.floor(Math.random() * videos.length);
                const videorndm = videos[gywee];

                const result = {
                    title: videorndm.title,
                    cover: videorndm.cover,
                    origin_cover: videorndm.origin_cover,
                    no_watermark: videorndm.play,
                    watermark: videorndm.wmplay,
                    music: videorndm.music
                };
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = handler;