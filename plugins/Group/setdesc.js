// setdesc.js

let handler = async (m, { q,hanz,setReply, command,onlyToko,onlyAdmin,onlyBadmin }) => {
    if (!m.isGroup) return onlyToko()
    if (!m.isAdmin) return onlyAdmin()
    if (!m.isBotAdmin) return onlyBadmin()

    if (!q) return setReply(`Kirim perintah ${command} <teks>`); // Memastikan ada teks yang dikirim untuk mengubah deskripsi grup
    
    try {
        // Mengubah deskripsi grup
        await hanz.groupUpdateDescription(m.chat, q);
        setReply("Deskripsi grup berhasil diubah.");
    } catch (err) {
        console.log(err);
        setReply("Terjadi kesalahan saat mengubah deskripsi grup.");
    }
};

handler.help = ["setdesc"];
handler.tags = ["group"];
handler.command = ["setdesc"];

module.exports = handler;
 