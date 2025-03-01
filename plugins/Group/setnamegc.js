// setnamegc.js

let handler = async (m, { q,hanz,setReply, command,onlyToko,onlyAdmin,onlyBadmin }) => {
   if (!m.isGroup) return onlyToko()
    if (!m.isAdmin) return onlyAdmin()
    if (!m.isBotAdmin) return onlyBadmin()
    
    if (!q) return setReply(`Kirim perintah ${command} <teks>`); // Memastikan ada teks yang dikirim untuk mengubah nama grup
    
    try {
        // Mengubah nama grup
        await hanz.groupUpdateSubject(m.chat, q);
        setReply("Nama grup berhasil diubah.");
    } catch (err) {
        console.log(err);
        setReply("Terjadi kesalahan saat mengubah nama grup.");
    }
};

handler.help = ["setnamegc"];
handler.tags = ["group"];
handler.command = ["setnamegc"];

module.exports = handler;
