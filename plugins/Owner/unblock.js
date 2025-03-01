let handler = async (m, { hanz, q, setReply, isOwner,onlyOwner }) => {
  if (!isOwner) return onlyOwner()
  if (m.isGroup) {
    if (m.users) {
      await hanz.updateBlockStatus(m.users, "unblock");
      await setReply(`Sukses unblock user`);
    } else if (!q) {
      setReply(
        "Silakan reply pesan atau tag atau input nomer yang mau di block"
      );
    }
  } else if (!m.isGroup) {
    if (q) {
      let woke =
        q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`;
      if (woke.startsWith("08")) return setReply("Awali nomer dengan 62");
      if (!woke.startsWith("62"))
        return setReply(
          "Silakan reply pesan atau tag atau input nomer yang mau di block"
        );
      await hanz.updateBlockStatus(woke, "unblock");
      setReply(`Sukses unblock ${woke}`);
    } else if (!q) {
      setReply("Masukan nomer yang ingin di unblock");
    }
  }
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = /^(unblock)$/i;
handler.owner = true;
handler.group = false;

module.exports = handler;
