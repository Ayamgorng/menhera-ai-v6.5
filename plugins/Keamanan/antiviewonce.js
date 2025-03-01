let handler = async (
  m,
  { hanz, q, args, isOwner, setReply, text, command, usedPrefix }
) => {
  const isAntiViewOnce = m.isGroup ? db.data.chats[m.chat].antiviewonce : false;

  // Check if the user is a group admin
  if (!m.isAdmin) return setReply(mess.only.admin);

  // Check if the command is issued in a group
  if (!m.isGroup) return setReply("Hanya bisa di grup!");

  // Enable the feature
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiViewOnce) return setReply("Fitur sudah aktif, kak!");
    db.data.chats[m.chat].antiviewonce = true;
    let ih = `Fitur antiviewonce telah diaktifkan!`;
    return setReply(ih);
  } 
  
  // Disable the feature
  else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiViewOnce) return setReply("Fitur sudah dimatikan!");
    db.data.chats[m.chat].antiviewonce = false;
    let ih = `Fitur antiviewonce telah dimatikan!`;
    return setReply(ih);
  } 
  
  // Show usage instructions if no argument is provided
  else if (!q) {
    return setReply("Pilih on atau off");
  }
};

handler.help = ["antiviewonce"];
handler.tags = ["group"];
handler.command = ["antiviewonce"];
handler.group = true;
handler.admin = true;

module.exports = handler;
