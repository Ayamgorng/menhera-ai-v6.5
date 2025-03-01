 
const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');
const { getRandomFile, makeid, pickRandom } = require('../../lib/myfunc');
const uploadImage = require('../../lib/uploadImage');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

const handler = async (m, { hanz, setReply, args, prefix,sendReact }) => {
    try {
        sendReact('🕒')
        const quoted = m.quoted ? m.quoted : m;
        async function makeSticker(media, Sticker, StickerTypes) {
            const jancok = new Sticker(media, {
                pack: packName, 
                author: m.pushname,
                type: StickerTypes.FULL, // Jenis stiker penuh
                categories: ['🤩', '🎉'], // Kategori stiker
                id: '12345', // ID stiker
                quality: 70, // Kualitas output file
                background: '#FFFFFF00' // Warna background
            });
            const stok = getRandomFile('.webp');
            await jancok.toFile(stok);
            const nah = fs.readFileSync(stok);
            await hanz.sendMessage(m.chat, { sticker: nah }, { quoted: m });
            fs.unlinkSync(stok);
        }

        const randomColor = ['#ef1a11', '#89cff0', '#660000', '#87a96b', '#e9f6ff', '#ffe7f7', '#ca86b0', '#83a3ee', '#abcc88', '#80bd76', '#6a84bd', '#5d8d7f', '#530101', '#863434', '#013337', '#133700', '#2f3641', '#cc4291', '#7c4848', '#8a496b', '#722f37', '#0fc163', '#2f3641', '#e7a6cb', '#64c987', '#e6e6fa'];
        const apiColor = randomColor[Math.floor(Math.random() * randomColor.length)];
        const dia = (m.quoted?.text ? m.quoted : m).sender;
        const name = await hanz.getName(dia);
        const teks = m.quoted ? m.quoted.text : args.join(' ') || "";
        const avatar = await hanz.profilePictureUrl(dia, "image").catch(() => "https://telegra.ph/file/89c1638d9620584e6e140.png");

        const generateQuote = async (imageUrl) => {
            const json = {
                type: "quote",
                format: "png",
                backgroundColor: apiColor,
                width: 512,
                height: 768,
                scale: 2,
                messages: [{
                    entities: 'auto',
                    media: imageUrl ? { url: imageUrl } : undefined,
                    avatar: true,
                    from: {
                        id: pickRandom([0, 4, 5, 3, 2, 7, 5, 9, 8, 1, 6, 10, 9, 7, 5, 3, 1, 2, 4, 6, 8, 0, 10]),
                        name,
                        photo: { url: avatar }
                    },
                    text: teks,
                    replyMessage: {}
                }]
            };
            const { data } = await axios.post("https://quotly.netorare.codes/generate", json, {
                headers: { "Content-Type": "application/json" }
            }).catch(e => e.response || {});
            if (!data.ok) throw data;
            return Buffer.from(data.result.image, "base64");
        };

        if (/image/.test(quoted?.mimetype) || /webp/.test(quoted?.mimetype)) {
            const mediaPath = await hanz.downloadAndSaveMediaMessage(quoted, makeid(5));
            const buffer = fs.readFileSync(mediaPath);
            const imageUrl = await uploadImage(buffer);
            const quoteBuffer = await generateQuote(imageUrl);
            fs.unlinkSync(mediaPath);
            await makeSticker(quoteBuffer, Sticker, StickerTypes);
        } else if (quoted?.mimetype === 'image/webp') {
            const mediaPath = await hanz.downloadAndSaveMediaMessage(quoted, makeid(5));
            const pngPath = getRandomFile('.png');
            exec(`ffmpeg -i ${mediaPath} ${pngPath}`, async (err) => {
                fs.unlinkSync(mediaPath);
                if (err) return setReply('Terjadi kesalahan saat memproses media.');
                const buffer = fs.readFileSync(pngPath);
                const imageUrl = await uploadImage(buffer);
                const quoteBuffer = await generateQuote(imageUrl);
                fs.unlinkSync(pngPath);
                await makeSticker(quoteBuffer, Sticker, StickerTypes);
            });
        } else {
            const quoteBuffer = await generateQuote();
            await makeSticker(quoteBuffer, Sticker, StickerTypes);
        }
    } catch (e) {
        setReply('Ada kesalahan sistem.');
        console.error(e);
    }
};


handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = /^(qc)$/i;
handler.noCmdStore = true  
handler.onlyGroup = true

module.exports = handler;
            
        