let handler = async (m, { hanz, q, args, isOwner, setReply }) => {
  const isSimiActive = m.isGroup ? db.data.chats[m.chat].simi : false;

  if (!m.isGroup) return setReply("❌ *Khusus untuk grup!*");
  if (!m.isAdmin) return setReply("❌ *Hanya admin yang bisa menggunakan perintah ini!*");
  if (!m.isBotAdmin) return setReply("❌ *Bot harus menjadi admin!*");

  if (args[0] === "on" || args[0] === "enable" || args[0] === "1") {
    if (isSimiActive) return setReply("⚠️ *Simi sudah aktif!*");
    db.data.chats[m.chat].simi = true;
    setReply("✅ *Sukses mengaktifkan fitur simi!*");
  } else if (args[0] === "off" || args[0] === "disable" || args[0] === "0") {
    if (!isSimiActive) return setReply("⚠️ *Simi sudah dimatikan!*");
    db.data.chats[m.chat].simi = false;
    setReply("✅ *Sukses mematikan fitur simi!*");
  } else if (!q) {
    setReply("❓ *Pilih on atau off.*");
  }
};

handler.tags = ["group"];
handler.command = ["simi"];
handler.group = true;
handler.admin = true;
handler.owner = true;

module.exports = handler;