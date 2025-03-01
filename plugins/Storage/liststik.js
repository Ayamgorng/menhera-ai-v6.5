
let handler = async (m, { hanz, q, setReply}) => {
    
let teks = '\n\n––––––『 *STICKER LIST* 』––––––\n\n'
for (let awokwkwk of Object.keys(db.data.sticker)) {
teks += `- ${awokwkwk}\n`
}
teks += `\nTotal ada : ${Object.keys(db.data.sticker).length}`
teks += `\n\n📮 *Note:* ↓
• Untuk mengambil sticker ketik nama sticker
• Gunaka huruf sesuai dengan nama sticker
• Dilarang spam berlebihan menggunakan sticker
• Request sticker silakan hubungi owner\n`
setReply(teks)
}

handler.help = ['addvn'];
handler.tags = ['database'];
handler.command = /^(liststik)$/i; // 
handler.owner = true;

module.exports = handler;