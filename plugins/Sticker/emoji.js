const fileType = require('file-type');
const fetch = require('node-fetch');

const handler = async (m, { args, hanz }) => {
    if (!args[0]) return m.reply("Penggunaan:\n!notoemoji <emoji>\n\nContoh:\n!notoemoji 😅");
    
    try {
        m.reply("Tunggu sebentar, saya sedang mencari emoji tersebut...");

        let unicode = emojiUnicode(args[0]);
        let url = `https://fonts.gstatic.com/s/e/notoemoji/latest/${unicode}/512.webp`;
        let response = await fetch(url);

        if (!response.ok) throw new Error('Gagal mengunduh gambar emoji');
        
        // Menggunakan response.arrayBuffer() sebagai pengganti response.buffer()
        let arrayBuffer = await response.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer); // Konversi ArrayBuffer ke Buffer
let mimeType = await getMimeTypeFromBuffer(buffer);
        if (!/image/.test(mimeType)) return m.reply("Maaf, emoji ini tidak didukung.");

        await hanz.sendFile(m.chat, url, "", "", m);
        m.reply("Berhasil mengirim emoji yang diminta!");
    } catch (e) {
        m.reply(`Terjadi kesalahan: ${e.message}`);
    }
};

handler.command = ["emoji"];
handler.help = ["emoji"];
handler.tags = ["sticker"];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;

async function getMimeTypeFromBuffer(buffer) {
    const type = await fileType.fromBuffer(buffer); // Memanggil fromBuffer dari fileType
    if (type) {
        return type.mime;
    } else {
        console.error('Tipe file tidak ditemukan.');
        return null;
    }
}

function emojiUnicode(input) {
    return emojiUnicode.raw(input).split(' ').map(function (val) {
        return parseInt(val).toString(16);
    }).join(' ');
}

emojiUnicode.raw = function (input) {
    if (input.length === 1) {
        return input.charCodeAt(0).toString();
    } else if (input.length > 1) {
        let pairs = [];
        for (let i = 0; i < input.length; i++) {
            if (input.charCodeAt(i) >= 0xd800 && input.charCodeAt(i) <= 0xdbff) {
                if (input.charCodeAt(i + 1) >= 0xdc00 && input.charCodeAt(i + 1) <= 0xdfff) {
                    pairs.push((input.charCodeAt(i) - 0xd800) * 0x400 + (input.charCodeAt(i + 1) - 0xdc00) + 0x10000);
                }
            } else if (input.charCodeAt(i) < 0xd800 || input.charCodeAt(i) > 0xdfff) {
                pairs.push(input.charCodeAt(i));
            }
        }
        return pairs.join(' ');
    }
    return '';
};
