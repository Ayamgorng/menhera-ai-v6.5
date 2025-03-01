let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  // Anti-Link Settings
  const isAntiLinkGc = m.isGroup ? db.data.chats[m.chat].antilinkgc : false;
  const antiLinkAction = m.isGroup ? db.data.chats[m.chat].antilinkgcAction : 'delete'; // "delete" or "remove"
  const linkRegex = /https?:\/\/(chat\.whatsapp\.com\/[A-Za-z0-9]+)/; 
  if (m.isGroup && isAntiLinkGc) {
    
    const messageContent = m.budy ? m.budy.toLowerCase() : '';

  
    if (linkRegex.test(messageContent)) {
      
      if (m.isAdmin) {
        return m.reply('Kamu admin grup, jadi Linkgc ini tidak akan dihapus :v');
      }
    let linkgc = await hanz.groupInviteCode(m.chat);
    if (m.budy.includes(`${linkgc}`))
      return m.reply(
        "Wuanjir kirain link grup lain, huh hampir aja kena kick 😆"
      );
     if (!m.isBotAdmin) return m.reply('Bot Bukan Admin Jadi Ga Bisa Hapus Linkgc Nya')
      // Send notification message
      if (m.isBotAdmin) {
  await m.reply(`\`\`\`「 Link Terdeteksi 」\`\`\`\nMaaf, saya akan mengambil tindakan sesuai pengaturan anti-link grup ini.`);

  if (antiLinkAction === 'delete') {
    // Tunggu sejenak sebelum menghapus pesan
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Hapus pesan yang terdeteksi
    await hanz.sendMessage(m.chat, { 
      delete: { 
        remoteJid: m.chat, 
        fromMe: false, 
        id: m.key.id, 
        participant: m.key.participant || m.participant 
      } 
    });
  } else if (antiLinkAction === 'remove') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await hanz.sendMessage(m.chat, { 
      delete: { 
        remoteJid: m.chat, 
        fromMe: false, 
        id: m.key.id, 
        participant: m.key.participant || m.participant 
      } 
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
   await hanz.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
  }
}

      }
    
  }
};

module.exports = handler;
