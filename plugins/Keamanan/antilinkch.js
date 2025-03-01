let handler = async (
  m,
  { hanz,q, args, isOwner, setReply, text, command, usedPrefix }
) => {
  const isAntilinkCh = m.isGroup ? db.data.chats[m.chat].antilinkch : false;
  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isGroup) return setReply("hanya bisa di group");
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntilinkCh) return setReply("Fitur sudah aktif kak");
    db.data.chats[m.chat].antilinkch = true;
    let ih = `Fitur antilink channel telah di aktifkan`;
    setReply(ih);
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntilinkCh) return setReply("Udah mati");
    db.data.chats[m.chat].antilinkch = false;
    let ih = `Fitur antilink channel telah di matikan`;
    setReply(ih);
  } else if (!q) {
    setReply("Pilih on atau off");
  }
};
handler.help = ["antilinkgc"];
handler.tags = ["group"];
handler.command = ["antilinkch","antilinkchannel"];
handler.group = true;
handler.admin = true;
module.exports = handler;
