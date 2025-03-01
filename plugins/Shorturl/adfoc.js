
const fetch = require('node-fetch');

let handler = async (m, { text }) => {
    if (!text) return m.reply('Masukkan link yang ingin dipendekkan.');

async function adfoc(url) {
        try {
            const response = await fetch(`https://adfoc.us/api/?key=3dda30eb032141a2b2b3100a3dbfb3c9&url=${url}`);
            const result = await response.text();
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

 let adfocUrl = await adfoc(text)
if (adfocUrl) {
        m.reply(`URL pendek: ${adfocUrl}`); 
    } else {
        m.reply('Terjadi kesalahan saat mempersingkat URL.');
    }
}

handler.help = ['adfoc <url>'];
handler.tags = ['shorturl'];
handler.command = /^adfoc$/i;
handler.limit = false;

module.exports = handler;