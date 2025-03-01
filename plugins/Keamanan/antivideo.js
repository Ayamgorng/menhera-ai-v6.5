let handler = async (m, { hanz, q, args, isOwner, setReply }) => {

  const isAntiVideo = m.isGroup ? db.data.chats[m.chat].antivideo : false;

  if (!m.isGroup) return setReply("Kusus group");
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiVideo) return setReply("Sudah aktif!!");
    db.data.chats[m.chat].antivideo = true;
    setReply("Sukses mengaktifkan antivideo!");
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiVideo) return setReply("Udah off!!");
    db.data.chats[m.chat].antivideo = false;
    setReply("Sukses mematikan antivideo!");
  } else if (!q) {
    setReply("Pilih on atau off");
  }
};

handler.tags = ["group"];
handler.command = ["antivideo"];
handler.group = true;
handler.admin = true;
module.exports = handler;