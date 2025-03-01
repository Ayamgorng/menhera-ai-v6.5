// delppgc.js

let handler = async (m, { hanz,setReply, command,onlyToko,onlyAdmin,onlyBadmin }) => {
  
    if (!m.isAdmin) return onlyAdmin()
    if (!m.isBotAdmin) return onlyBadmin()

    try {
        // Menghapus foto profil grup
        await hanz.removeProfilePicture(m.chat);
        setReply("Foto profil grup berhasil dihapus!");
    } catch (err) {
        console.error(err);
        setReply("Terjadi kesalahan saat menghapus foto profil grup.");
    }
};

handler.help = ["delppgc"];
handler.tags = ["group"];
handler.command = ["delppgc"];
handler.onlyGroup = true;
module.exports = handler;
