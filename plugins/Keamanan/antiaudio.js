let handler = async (m, { hanz, q, args, isOwner, setReply }) => {

  const isAntiAudio = m.isGroup ? db.data.chats[m.chat].antiaudio : false;
  if (!m.isGroup) return setReply("Kusus group");
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiAudio) return setReply("Sudah aktif!!");
    db.data.chats[m.chat].antiaudio = true;
    setReply("Sukses mengaktifkan antiaudio!");
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiAudio) return setReply("Udah off!!");
    db.data.chats[m.chat].antiaudio = false;
    setReply("Sukses mematikan antiaudio!");
  } else if (!q) {
    setReply("Pilih on atau off");
  }
};

handler.tags = ["group"];
handler.command = ["antiaudio"];
handler.onlyGroup = true;
handler.admin = true;
module.exports = handler;