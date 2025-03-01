let handler = async (m, { hanz, q, setReply, isOwner, args, prefix, command }) => {
  if (!isOwner) return setReply("Hanya pemilik yang dapat menggunakan perintah ini.");

 
  let replyType = db.data.settings["settingbot"].replyType;

  const validReplyTypes = ['web', 'web2', 'mess', 'katalog', 'document'];

  if (!args[0]) {
    return setReply(`Silakan pilih salah satu:

┌  • web  
│  • web2 
│  • mess
│  • katalog
└  • document

Contoh: ${prefix + command} web`);
  }

  if (validReplyTypes.includes(args[0])) {
    if (replyType === args[0]) {
      return setReply("Tipe reply sudah aktif.");
    }

     db.data.settings["settingbot"].replyType = args[0];
    return setReply(`Berhasil mengubah setreply ke ${args[0]}`);
  } else {
 
    return setReply("Tipe reply tidak ditemukan. Silakan periksa kembali.");
  }
};

handler.help = ["setreply"];
handler.tags = ["owner"];
handler.command = ["setreply"];

module.exports = handler;
