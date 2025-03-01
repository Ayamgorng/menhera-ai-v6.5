let handler = async (m, { hanz, q, args, isOwner, setReply, text, command, usedPrefix,onlyBadmin }) => {
  const isAntiPorn = m.isGroup ? db.data.chats[m.chat].antiPorn : false;
  
 if (!m.isBotAdmin) return onlyBadmin()
  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isAntiPorn) return setReply("Fitur antiporn sudah aktif.");
    db.data.chats[m.chat].antiPorn = true;
    let ih = `Fitur antiporn telah diaktifkan.`;
    setReply(ih);
  
  
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isAntiPorn) return setReply("Fitur antiporn sudah nonaktif.");
    db.data.chats[m.chat].antiPorn = false;
    let ih = `Fitur antiporn telah dimatikan.`;
    setReply(ih);
  
 
  } else if (!q) {
    setReply("Silakan pilih on atau off untuk mengaktifkan atau menonaktifkan fitur antiporn.");
  }
};

handler.help = ["antiporn"];
handler.tags = ["group"];
handler.command = ["antiporn"];
handler.group = true;
handler.admin = true;
module.exports = handler;