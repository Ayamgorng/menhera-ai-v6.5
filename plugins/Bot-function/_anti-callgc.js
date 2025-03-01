let handler = (m) => m;

handler.before = async function (m, { hanz }) {
 
  const isAntiCall = m.isGroup ? db.data.chats[m.chat]?.antipromosi : false;
  const isCall = m.mtype === "callLogMessage";

  if (m.isGroup && isAntiCall && isCall) {
    if (m.isAdmin) {
    
      return m.reply("😎 Kamu adalah admin grup, jadi panggilan ini tidak akan dihapus!");
    }

    if (!m.isBotAdmin) {
     
      return m.reply("Bot bukan admin, jadi tidak dapat menghapus panggilan!");
    }

    if (m.isBotAdmin) {
      
      await m.reply(`\`\`\`「 Panggilan Terdeteksi 」\`\`\`\nMaaf, saya akan mengambil tindakan sesuai pengaturan Anti-Call grup ini.`);

      await new Promise((resolve) => setTimeout(resolve, 1000));

    
      await hanz.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant || m.participant,
        },
      });
    }
  }
};

module.exports = handler;