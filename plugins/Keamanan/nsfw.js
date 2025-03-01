let handler = async (
  m,
  { hanz, isOwner, q, setReply, text, command, usedPrefix }
) => {
  let chat = db.data.chats[m.chat];

  if (!m.isGroup) return setReply("Fitur ini hanya dapat digunakan di dalam grup!");
  if (!q) return setReply("Masukkan perintah 'on' atau 'off' untuk mengaktifkan atau menonaktifkan fitur NSFW.");
  if (!chat) return setReply("Grup ini belum terdaftar di database bot.");

  // Kondisi NSFW
  if (q === "on") {
    if (chat.nsfw === true) return setReply("🔞 Fitur NSFW sudah aktif di grup ini!");
    db.data.chats[m.chat].nsfw = true;
    setReply("✅ Fitur NSFW berhasil diaktifkan! Akses konten dewasa dengan bijak.");
  } else if (q === "off") {
    if (chat.nsfw === false) return setReply("🚫 Fitur NSFW sudah dinonaktifkan di grup ini.");
    db.data.chats[m.chat].nsfw = false;
    setReply("❌ Fitur NSFW telah dinonaktifkan.");
  } else {
    setReply("⚠️ Pilih 'on' untuk mengaktifkan atau 'off' untuk menonaktifkan fitur NSFW.");
  }
};

// Informasi tambahan untuk perintah handler
handler.help = ["nsfw"];
handler.tags = ["group"];
handler.command = ["nsfw"];
handler.group = true; // hanya bisa digunakan dalam grup
handler.admin = true; // hanya admin yang bisa menggunakan
module.exports = handler
