let handler = async (
  m,
  { hanz, isOwner, q, setReply, text, command, usedPrefix }
) => {
  let chat = db.data.chats[m.chat];

  if (!m.isGroup) return setReply("Fitur ini hanya dapat digunakan di dalam group, para petualang!");
  if (!q) return setReply("Masukkan perintah 'on' atau 'off' untuk mengaktifkan atau menonaktifkan mode RPG.");
  if (!chat) return setReply("Group ini belum terdaftar di database bot.");

  // Kondisi RPG
  if (q === "on") {
    if (chat.rpg === true) return setReply("⚔️ Mode RPG sudah aktif di group ini, bersiaplah untuk petualangan epik!");
    db.data.chats[m.chat].rpg = true;
    setReply("🎮 Mode RPG berhasil diaktifkan! Waktunya untuk memulai petualanganmu dan kumpulkan harta karun!");
  } else if (q === "off") {
    if (chat.rpg === false) return setReply("🛡️ Mode RPG sudah dinonaktifkan di group ini, istirahatlah sebelum petualangan berikutnya.");
    db.data.chats[m.chat].rpg = false;
    setReply("❌ Mode RPG telah dinonaktifkan. Petualangan dihentikan sementara.");
  } else {
    setReply("⚠️ Pilih 'on' untuk mengaktifkan atau 'off' untuk menonaktifkan mode RPG.");
  }
};

// Informasi tambahan untuk perintah handler
handler.help = ["rpg"];
handler.tags = ["group"];
handler.command = ["rpg"];
handler.group = true; // hanya bisa digunakan dalam group
handler.admin = true; // hanya admin yang bisa menggunakan
module.exports = handler;