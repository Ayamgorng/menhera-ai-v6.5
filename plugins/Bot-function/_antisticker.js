let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  // Cek apakah fitur anti-sticker aktif di grup
  const isAntiSticker = m.isGroup ? db.data.chats[m.chat].antisticker : false;

  // Cek apakah pesan mengandung media (sticker)
  const isHanMedia = m.mtype;

  // ANTI STICKER
  if (m.isGroup && isAntiSticker && isHanMedia) {
    if (isHanMedia === "stickerMessage") {
      // Cek jika pengirim adalah admin
      if (m.isAdmin) {
        return m.reply('😎 Kamu admin grup, jadi Sticker ini tidak akan dihapus!');
      }

      if (!m.isBotAdmin) return m.reply('Bot Bukan Admin Jadi Ga Bisa Hapus Sticker Nya')
      // Send notification message
      if (m.isBotAdmin) { 
  await m.reply(`\`\`\`「 Sticker Terdeteksi 」\`\`\`\nMaaf, saya akan mengambil tindakan sesuai pengaturan Anti-Sticker grup ini.`);
  
  // Tunggu sejenak untuk memastikan pesan peringatan terkirim sebelum menghapus
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  
  await hanz.sendMessage(m.chat, { 
    delete: { 
      remoteJid: m.chat, 
      fromMe: false, 
      id: m.key.id, 
      participant: m.key.participant || m.participant 
    }
  });
}
      }
    }
  
};

module.exports = handler;
