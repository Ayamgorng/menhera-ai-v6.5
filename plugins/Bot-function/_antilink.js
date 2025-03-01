let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  // ANTI LINK
  const isAntiLink = m.isGroup ? db.data.chats[m.chat].antilink : false;
const linkRegex = /https?:\/\/[^\s]+/;
  if (m.isGroup && isAntiLink) { 
    const messageContent = m.budy ? m.budy.toLowerCase() : '';
    if (linkRegex.test(messageContent)) {
      if (m.isAdmin) {
        return m.reply('😎 Kamu admin grup, jadi Link ini tidak akan dihapus!');
      }
      if (!m.isBotAdmin) return m.reply('Bot Bukan Admin Jadi Ga Bisa Hapus Link Nya')
     if (m.isBotAdmin) { 
  await m.reply(`\`\`\`「 Link Terdeteksi 」\`\`\`\nMaaf, saya akan mengambil tindakan sesuai pengaturan Anti-Link grup ini.`);
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

