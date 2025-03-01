let handler = async (m, { hanz, q, args, isOwner, setReply }) => {

  const isAntiSpam = m.isGroup ? db.data.chats[m.chat].antispam : false; // Cek apakah antispam aktif di grup
  if (!m.isGroup) return setReply("Khusus untuk grup"); // Hanya untuk grup
  if (!m.isAdmin) return setReply(mess.only.admin); // Cek apakah pengirim admin
  if (!m.isBotAdmin) return setReply(mess.only.Badmin); // Bot harus admin untuk mengelola grup
  
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiSpam) return setReply("Antispam sudah aktif!"); // Cek apakah antispam sudah aktif
    db.data.chats[m.chat].antispam = true; // Mengaktifkan antispam
    setReply("Sukses mengaktifkan antispam!");
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiSpam) return setReply("Antispam sudah nonaktif!"); // Cek apakah antispam sudah nonaktif
    db.data.chats[m.chat].antispam = false; // Menonaktifkan antispam
    setReply("Sukses mematikan antispam!");
  } else if (!q) {
    setReply("Harap pilih antara 'on' atau 'off' untuk mengaktifkan/mematikan antispam"); // Jika tidak ada argumen yang diberikan
  }
};

handler.tags = ["group"];
handler.command = ["antispam"];
handler.group = true;
handler.admin = true;
module.exports = handler;
