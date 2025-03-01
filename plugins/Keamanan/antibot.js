let handler = async (m, { hanz, q, args, isOwner, setReply }) => {
  const isAntiBot = m.isGroup ? db.data.chats[m.chat].antibot : false;
  if (!m.isGroup) return setReply("Kusus group");
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiBot) return setReply("Sudah aktif!!");
    db.data.chats[m.chat].antibot = true;
    setReply("Sukses mengaktifkan antibot!");
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiBot) return setReply("Udah off!!");
    db.data.chats[m.chat].antibot = false;
    setReply("Sukses mematikan antibot!");
  } else if (!q) {
    setReply("Pilih on atau off");
  }
};

handler.tags = ["group"];
handler.command = ["antibot"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;