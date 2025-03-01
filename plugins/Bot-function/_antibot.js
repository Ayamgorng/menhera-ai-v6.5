let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  const isAntiBot = m.isGroup ? db.data.chats[m.chat]?.antibot : false;

  // ANTI BOT
  if (m.isGroup && isAntiBot) {
    if (m.isBaileys && !m.fromMe) {
      // Memeriksa apakah bot adalah admin grup
      const groupMetadata = await hanz.groupMetadata(m.chat);
      const botNumber = hanz.user.jid; // Nomor bot
      const isBotAdmin = groupMetadata.participants.some(participant => 
        participant.id === botNumber && participant.admin
      );

      if (isBotAdmin) {
        // Kirim pesan peringatan ke grup
        await m.reply(
          `\`\`\`「 ANTI BOT 」\`\`\`\n*Another Bot Detected*\n\nHusshhh! Get away from this group!!!`
        );

        // Tunggu sejenak sebelum melakukan tindakan
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Hapus bot yang terdeteksi
        return await hanz.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      } else {
        // Jika bot bukan admin, kirim peringatan ke konsol
        console.log(`[ANTI BOT] Bot tidak dapat menghapus anggota karena bukan admin.`);
      }
    }
  }
};

module.exports = handler;