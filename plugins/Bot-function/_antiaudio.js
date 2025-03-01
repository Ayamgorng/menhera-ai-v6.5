let handler = (m) => m;

handler.before = async function (m, { isAdmins, isBotAdmins, hanz }) {
  // Periksa apakah fitur anti-audio aktif di grup
  const isAntiAudio = m.isGroup ? db.data.chats[m.chat]?.antiaudio : false;
  const isHanMedia = m.mtype;

  // ANTI AUDIO
  if (m.isGroup && isAntiAudio && isHanMedia === "audioMessage") {
    if (m.isAdmin) {
      // Jika pengirim adalah admin, bot tidak akan menghapus audio
      return m.reply('😎 Kamu admin grup, jadi audio ini tidak akan dihapus!');
    }

    if (!m.isBotAdmin) {
      
      return m.reply('Bot bukan admin, jadi tidak bisa menghapus audio.');
    }

    
    await m.reply(`\`\`\`「 Audio Terdeteksi 」\`\`\`\nMaaf, saya akan mengambil tindakan sesuai pengaturan Anti-Audio grup ini.`);

   
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Hapus pesan audio
    await hanz.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.key.participant || m.participant,
      },
    });
  }
};

module.exports = handler;
