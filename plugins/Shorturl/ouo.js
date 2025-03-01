
// from tanaka sen
const fetch = require('node-fetch');

let handler = async (m, { text }) => {
    if (!text) return m.reply('Masukkan link yang ingin dipendekkan.');
    
    

async function ouo(url) {
 try {
 const sensei = await fetch(`http://ouo.io/api/KzDtJCvY?s=${url}`);
 const result = await sensei.text();
 return result;
 } catch (error) {
 console.error(error);
 return null;
 }
 }
let ouoUrl = await ouo(text)
if (ouoUrl) {
        m.reply(`URL pendek: ${ouoUrl}`); 
    } else {
        m.reply('Terjadi kesalahan saat mempersingkat URL.'); 
    }
}

handler.help = ['ouo <url>'];
handler.tags = ['shorturl'];
handler.command = /^ouo$/i;
handler.limit = false;

module.exports = handler;