// setppgc.js

const fs = require('fs');

let handler = async (m, { hanz,setReply, command,onlyToko,onlyAdmin,onlyBadmin }) => {
   if (!m.isAdmin ) return onlyAdmin()
  if (!m.isGroup) return onlyToko()
  if (!m.isBotAdmin) return onlyBadmin()
const isQuotedImage = m.quoted && m.quoted.mtype === 'imageMessage'; 
    const isImage = m.mtype === 'imageMessage'; 
    const quoted = m.quoted ? m.quoted : m;

    if (isImage || isQuotedImage) {
        try {
            // Mengunduh dan menyimpan media gambar
            let media = await hanz.downloadAndSaveMediaMessage(quoted, 'ppgc_' + Date.now());
            
            // Mengupdate foto profil grup
            await hanz.profilePictureUrl(m.chat, { url: media });
            setReply("Sukses mengubah foto profil grup!");

            // Menghapus file gambar setelah diunggah
            fs.unlinkSync(media);
        } catch (err) {
            console.error(err);
            setReply("Terjadi kesalahan saat mengubah foto profil grup.");
        }
    } else {
        setReply(`Kirim atau balas gambar dengan caption .${command} untuk mengubah foto profil grup.`);
    }
};

handler.help = ["setppgc"];
handler.tags = ["group"];
handler.command = ["setppgc"];

module.exports = handler;
