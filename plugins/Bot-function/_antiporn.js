const fetch = require('node-fetch');
const fs = require("fs-extra");
const uploadImage = require('../../lib/uploadImage'); // pastikan uploadImage benar

let handler = m => m;

handler.before = async function(m, { hanz }) {
    // Periksa apakah pesan memiliki media yang relevan
    let quoted = m.quoted ? m.quoted : m;
    let mime = (quoted.msg || quoted).mimetype || '';

    // Periksa apakah fitur anti-porn diaktifkan di grup
    const isAntiPorn = m.isGroup ? db.data.chats[m.chat]?.antiPorn : false;
    if (!isAntiPorn || !/image/.test(mime)) return;

    try {
        // Unduh media dari pesan
               let media = await hanz.downloadAndSaveMediaMessage(quoted);
        if (!media) throw new Error('Gagal mengunduh media.');

        // Unggah gambar dan dapatkan URL
        let url = await uploadImage(media);
        if (!url) throw new Error('Gagal mengunggah gambar.');

    
        const response = await fetch(`https://api.botcahx.eu.org/api/tools/nsfw-detect?url=${url}&apikey=${Botcahx}`);
        const res = await response.json();

        // Periksa hasil deteksi NSFW
        if (res.result?.labelName === 'Porn') {
            // Hapus pesan jika terdeteksi sebagai pornografi
            await hanz.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
            m.reply('Astagfirullah🥲');
            fs.unlinkSync(media);
        }
    } catch (e) {
        console.error('Terjadi kesalahan:', e.message || e);
    }
};

module.exports = handler;