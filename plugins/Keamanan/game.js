let handler = async (
  m,
  { hanz, isOwner, q, setReply, text, command, usedPrefix }
) => {
  let chat = db.data.chats[m.chat];

  if (!m.isGroup) return setReply("Fitur ini hanya dapat digunakan di dalam grup!");
  if (!q) return setReply("Masukkan perintah 'on' atau 'off' untuk mengaktifkan atau menonaktifkan mode game.");
  if (!chat) return setReply("Grup ini belum terdaftar di database bot.");

  // Kondisi Game
  if (q === "on") {
    if (chat.game === true) return setReply("🎮 Mode game sudah aktif di grup ini!");
    db.data.chats[m.chat].game = true;
    setReply("✅ Mode game berhasil diaktifkan! Mulai permainan dan bersenang-senang!");
  } else if (q === "off") {
    if (chat.game === false) return setReply("🚫 Mode game sudah dinonaktifkan di grup ini.");
    db.data.chats[m.chat].game = false;
    setReply("❌ Mode game telah dinonaktifkan.");
  } else {
    setReply("⚠️ Pilih 'on' untuk mengaktifkan atau 'off' untuk menonaktifkan mode game.");
  }
};

// Informasi tambahan untuk perintah handler
handler.help = ["game"];
handler.tags = ["group"];
handler.command = ["game"];
handler.group = true; // hanya bisa digunakan dalam grup
handler.admin = true; // hanya admin yang bisa menggunakan
module.exports = handler;