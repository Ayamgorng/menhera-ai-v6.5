let handler = async (m, { hanz, q, args, isOwner, setReply }) => {

  const isAutoLevelUp = m.isGroup ? db.data.chats[m.chat].autolevelup : false;

  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAutoLevelUp) return setReply("Fitur Auto Level Up sudah aktif!");
    db.data.chats[m.chat].autolevelup = true;
    setReply("Fitur Auto Level Up berhasil diaktifkan!");
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAutoLevelUp) return setReply("Fitur Auto Level Up sudah nonaktif!");
    db.data.chats[m.chat].autolevelup = false;
    setReply("Fitur Auto Level Up berhasil dinonaktifkan!");
  } else if (!q) {
   
    setReply("Gunakan perintah: `on` atau `off` untuk mengatur Auto Level Up.");
  }
};

handler.tags = ["group"];
handler.command = ["autolevelup"]; 
handler.onlyGroup = true; 
handler.admin = true; 
module.exports = handler;