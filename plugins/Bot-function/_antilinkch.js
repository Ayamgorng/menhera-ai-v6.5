let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  // ANTI LINK
  const isAntiLinkCh = m.isGroup ? db.data.chats[m.chat].antilinkch : false;
  const linkRegex = /https?:\/\/(whatsapp\.com\/channel\/[A-Za-z0-9]+)/; 
  if (m.isGroup && isAntiLinkCh) {
    const messageContent = m.budy ? m.budy.toLowerCase() : '';
    if (linkRegex.test(messageContent)) {
        
if (m.isAdmin) {
        return m.reply('😎 Kamu admin grup, jadi Linkch ini tidak akan dihapus!');
      }
      if (!m.isBotAdmin) return m.reply('Bot Bukan Admin Jadi Ga Bisa Hapus Linkch Nya')
      if (m.isBotAdmin) { 
  await m.reply(`\`\`\`「 LinkCh Terdeteksi 」\`\`\`\nMaaf, saya akan mengambil tindakan sesuai pengaturan Anti-LinkCh grup ini.`);
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

