let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  // Cek apakah fitur anti-video aktif di grup
  const isAntiVideo = m.isGroup ? db.data.chats[m.chat].antivideo : false;

  // Cek apakah pesan mengandung media (video)
  const isHanMedia = m.mtype;

  // ANTI VIDEO
  if (m.isGroup && isAntiVideo && isHanMedia) {
    if (isHanMedia === "videoMessage") {
      // Cek jika pengirim adalah admin
       if (m.isAdmin) {
        return m.reply('😎 Kamu admin grup, jadi Video ini tidak akan dihapus!');
      }

      if (!m.isBotAdmin) return m.reply('Bot Bukan Admin Jadi Ga Bisa Hapus Video Nya')
      // Send notification message
      if (m.isBotAdmin) { 
  await m.reply(`\`\`\`「 Video Terdeteksi 」\`\`\`\nMaaf, saya akan mengambil tindakan sesuai pengaturan Anti-Video grup ini.`);
  
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