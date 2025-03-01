let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  const isAntiImage = m.isGroup ? db.data.chats[m.chat].antiimage : false;
  const isHanMedia = m.mtype;

  // ANTI IMAGE
  if (m.isGroup && isAntiImage && isHanMedia) {
    if (isHanMedia === "imageMessage") {
      if (m.isAdmin) {
        return m.reply('😎 Kamu admin grup, jadi Gambar ini tidak akan dihapus!');
      }
      if (!m.isBotAdmin) return m.reply('Bot Bukan Admin Jadi Ga Bisa Hapus Gambar Nya')
     if (m.isBotAdmin) { 
  await m.reply(`\`\`\`「 Image Terdeteksi 」\`\`\`\nMaaf, saya akan mengambil tindakan sesuai pengaturan Anti-Image grup ini.`);
  
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

