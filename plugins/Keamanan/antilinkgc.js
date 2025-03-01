let handler = async (
  m,
  { hanz, q, args, isOwner, setReply, text, command, usedPrefix }
) => {
  const isAntilinkGc = m.isGroup ? db.data.chats[m.chat].antilinkgc : false;
  const antiLinkAction = m.isGroup ? db.data.chats[m.chat].antilinkgcAction : 'delete'; // "delete" atau "remove"

  if (!m.isAdmin) return setReply(mess.only.admin);
  if (!m.isGroup) return setReply("Hanya bisa di group");

  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntilinkGc) return setReply("Fitur sudah aktif kak");

    db.data.chats[m.chat].antilinkgc = true;
    db.data.chats[m.chat].antilinkgcAction = args[1] === "remove" ? "remove" : "delete"; // Set ke "remove" atau "delete"

    let ih = `Fitur antilink group telah diaktifkan dengan aksi: ${db.data.chats[m.chat].antilinkgcAction}`;
    setReply(ih);

  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntilinkGc) return setReply("Fitur sudah tidak aktif");

    db.data.chats[m.chat].antilinkgc = false;
    setReply("Fitur antilink group telah dimatikan");

  } else if (!q) {
    setReply("Pilih on atau off, dan tentukan aksi (delete/remove)\nContoh .antilinkgc on remove");

  }
};
handler.help = ["antilinkgc"];
handler.tags = ["group"];
handler.command = ["antilinkgc"];
handler.group = true;
handler.admin = true;

module.exports = handler;
