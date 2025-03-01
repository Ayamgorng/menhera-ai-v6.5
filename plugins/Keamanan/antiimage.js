let handler = async (m, { hanz, q, args, isOwner, setReply }) => {
  const isAntiImage = m.isGroup ? db.data.chats[m.chat].antiimage : false;
  if (!m.isGroup) return setReply("Kusus group");
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiImage) return setReply("Sudah aktif!!");
    db.data.chats[m.chat].antiimage = true;
    setReply("Sukses mengaktifkan antiimage!");
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiImage) return setReply("Udah off!!");
    db.data.chats[m.chat].antiimage = false;
    setReply("Sukses mematikan antiimage!");
  } else if (!q) {
    setReply("Pilih on atau off");
  }
};

handler.tags = ["group"];
handler.command = ["antiimage"];
handler.group = true;
handler.admin = true;
module.exports = handler;