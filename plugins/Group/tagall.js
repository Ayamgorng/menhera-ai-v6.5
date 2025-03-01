// tagall.js

let handler = async (m, { q,hanz,setReply, command,onlyToko,onlyAdmin,onlyBadmin}) => {
   if (!m.isGroup) return onlyToko()
  if (!m.isAdmin) return onlyAdmin()
  if (!m.isBotAdmin) return onlyBadmin()
    
 const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ?  hanz.sendMessage(m.chat, { text: teks, mentions: memberr, contextInfo: { "mentionedJid": memberr }}):  hanz.sendMessage(m.chat, {mentions: memberr,text: teks, contextInfo: { "mentionedJid": memberr }},{quoted: m})
}
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 
    let inpo = q ? q : `I love you` + readmore + `tube :v`; // Default message or custom message

    let members_id = [];
    let tes = '\n';

    // Mengambil semua ID anggota grup
    m.groupMembers.forEach(i => {
        tes += `• @${i.id.split('@')[0]}\n`; // Membuat string dengan tag anggota
        members_id.push(i.id); // Menyimpan ID anggota
    });

    // Menyebutkan semua anggota grup dengan pesan
    mentions(`${inpo}\n${tes}`, members_id, false);
};

handler.help = ["tagall"];
handler.tags = ["group"];
handler.command = ["tagall"];

module.exports = handler;
