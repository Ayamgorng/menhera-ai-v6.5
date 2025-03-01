let handler = async (m, { hanz, text, usedPrefix, command }) => {
  
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? hanz.user.jid : m.sender;
  let pp = await hanz.profilePictureUrl(who).catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60');
  let name = await hanz.getName(who);

  // Kirim kontak
  await hanz.sendContactArray(m.chat, [ 
    [`${nomerOwner}@s.whatsapp.net`, `${ownerName}`, `Developer Bot`, `✍️ Masih Belajar Jangan Dibully ya!`],
    [`${hanz.user.jid.split('@')[0]}`, `${await hanz.getName(hanz.user.jid)}`, `🤖 I'm Bot WhatsApp`, `⚠️ Jangan Spam Bisa Kena Block/Ban!`]
  ], m);

  // Balasan
  await m.reply(`Hi 👋, ada perlu apa? Jangan basa-basi, langsung to the point aja ya!`);
};

handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.command = /^(owner|creator)$/i;

module.exports = handler;