let handler = async (
  m,
  { hanz,q, args, isOwner, setReply, text, command, usedPrefix }
) => {
  const isAntiPromosi = m.isGroup ? db.data.chats[m.chat].antipromosi : false;
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isGroup) return setReply("hanya bisa di group");
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiPromosi) return setReply("Fitur sudah aktif kak");
 db.data.chats[m.chat].antipromosi = true;
    let ih = `Fitur antipromosi  telah di aktifkan`;
    setReply(ih);
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiPromosi) return setReply("Udah mati");
    db.data.chats[m.chat].antipromosi = false;
    let ih = `Fitur antipromosi telah di matikan`;
    setReply(ih);
  } else if (!q) {
    setReply("Pilih on atau off");
  }
};
handler.help = ["antipromosi"];
handler.tags = ["group"];
handler.command = ["antipromosi"];
handler.group = true;
handler.admin = true;
module.exports = handler;