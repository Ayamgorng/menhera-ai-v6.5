// creator by Rangelofficial from Ehanz 
//menfes


const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const uploadToGithub = require('../../lib/uploadToGithub');
const fileType = require('file-type');

let handler = async (m, { hanz, text, usedPrefix, command }) => {
    const MENFES_FILE = './database/menfes.json';

    
    let menfesData = {};
    if (fs.existsSync(MENFES_FILE)) {
        menfesData = JSON.parse(fs.readFileSync(MENFES_FILE));
    }

    if (!text && !m.quoted) throw `*Cara penggunaan:*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Contoh:* ${usedPrefix + command} 6281234567890|Anonymous|Halo, ini pesan rahasia!\nJika Ingin Sambil Kirim Image/Video Reply Img/vid nya Yah`;

    let [jid, name, pesan] = text ? text.split('|') : ['', '', ''];
    if ((!jid || !name || (!pesan && !m.quoted))) throw `*Cara penggunaan:*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Contoh:* ${usedPrefix + command} 6281234567890|Anonymous|Halo, ini pesan rahasia!\nJika Ingin Sambil Kirim Image/Video Reply Img/vid nya Yah`;

    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

  
    let data = (await hanz.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomor tidak terdaftar di WhatsApp.';
    if (jid === m.sender) throw 'Tidak bisa mengirim pesan Menfess ke diri sendiri.';

    let mediaUrl = '';
    let mime = (m.quoted ? m.quoted : m).mimetype || '';
    if (mime) {
        let media = await (m.quoted ? m.quoted.download() : m.download());
        let fileInfo = await fileType.fromBuffer(media);
        let ext = fileInfo ? fileInfo.ext : mime.split('/')[1];
        let fileName = `${Date.now()}.${ext}`;

        if (mime.startsWith('image/')) {
            mediaUrl = await uploadToGithub(media);
        } else if (mime.startsWith('video/')) {
            mediaUrl = await uploadToGithub(media, fileName);
        } else {
            throw 'Format media tidak didukung. Hanya gambar atau video yang dapat dikirim.';
        }
    }

  
    let id = +new Date();
    let teksPesan = `✨ *Hai, @${data.jid.split("@")[0]}!* ✨\n\nKamu baru saja menerima *Menfess*! 🎉\n\n📬 *Dari*: *${name}*\n📝 *Pesan*: \n"${pesan}"\n\n${mediaUrl ? '📎 *Media dilampirkan*\n' : ''}💌 Mau balas pesan ini? Gampang banget, kak! Cukup ketik balasan kakak dan kirim langsung ke sini. Nanti saya akan bantu sampaikan ke *${name}*! 😉`;

  
    if (mediaUrl) {
        await hanz.sendMessage(data.jid, {
            ...(mime.startsWith('image/') 
                ? { image: { url: mediaUrl }, caption: teksPesan }
                : { video: { url: mediaUrl }, caption: teksPesan }),
            mentions: [data.jid],
        });
    } else {
        await hanz.sendMessage(data.jid, {
            text: teksPesan,
            mentions: [data.jid],
        });
    }

 
    menfesData[id] = {
        id,
        dari: m.sender,
        nama: name,
        penerima: data.jid,
        pesan,
        mediaUrl,
        mime,
        balasan: [], 
        status: false,
    };

    fs.writeFileSync(MENFES_FILE, JSON.stringify(menfesData, null, 2));
    m.reply('Berhasil mengirim pesan Menfess dan menyimpannya ke data!');
};




handler.tags = ['fun'];
handler.help = ['menfess'];
handler.command = /^(menfess|menfes)$/i;
handler.private = true;
handler.description = ["Kirim pesan rahasia melalui bot"];

module.exports = handler;
    
    
