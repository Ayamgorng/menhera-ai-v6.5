let handler = async (m, { hanz,  q, setReply,prefix,command }) => {

  let teks = '\n\n––––––『 *RESPON LIST* 』––––––\n\n'
for (let bjir of Object.keys(db.data.respon)) {
teks += `- ${bjir}\n`
}
teks += `\nTotal ada : ${Object.keys(db.data.respon).length}`
teks += `\n\n📮 *Note:* ↓
• Untuk mengambil respon ketik nama respon
• Gunaka huruf sesuai dengan nama respon
• Dilarang spam berlebihan menggunakan respon
• Request respon silakan hubungi owner\n`
setReply(teks)
 }
  
handler.command = ["listrespon"];
handler.owner = true;

module.exports = handler;