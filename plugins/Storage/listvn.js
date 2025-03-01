

let handler = async (m, { hanz, q, setReply}) => {
let teks = '\n\n––––––『 *VOICE NOTE* 』––––––\n\n'
for (let awokwkwk of Object.keys(db.data.audio)) {
teks += `• ${awokwkwk}\n`
}
teks += `\n*Total ada : ${Object.keys(db.data.audio).length}*`
teks += Ehztext(`\n\n📮 *Note:* ↓
• Untuk mengambil vn ketik nama vn
• Gunaka huruf sesuai dengan nama vn
• Dilarang spam berlebihan menggunakan vn
• Request vn silakan hubungi owner\n`)
setReply(teks)
}

handler.help = ['addvn'];
handler.tags = ['database'];
handler.command = /^(listvn)$/i; // Menggunakan command addvn
handler.owner = true; // Hanya pemilik bot yang bisa menggunakan fitur ini

module.exports = handler;