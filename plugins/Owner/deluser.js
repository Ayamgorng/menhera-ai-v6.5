const handler = async (m, { text, usedPrefix }) => {
  let users = global.db.data.users;  
  if (!text) {
    return m.reply(`⚠️ Harap masukkan nomor pengguna yang ingin dihapus (tanpa @s.whatsapp.net). Contoh: *${usedPrefix}deluser 6287787808292*`);
  }

 
  let userId = `${text.trim()}@s.whatsapp.net`;

  
  if (!users[userId]) {
    return m.reply(`❌ Pengguna dengan nomor ${userId} tidak ditemukan dalam database.`);
  }

  
  delete users[userId];

  
  m.reply(`✅ Pengguna dengan nomor ${userId} telah dihapus dari database.`);
};

handler.help = ["deluser"].map((v) => v + " <nomor>");
handler.tags = ["admin"];  
handler.command = /^deluser$/i;  

module.exports = handler;