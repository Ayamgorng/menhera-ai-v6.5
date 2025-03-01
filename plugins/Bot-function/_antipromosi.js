let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  // ANTI PROMOSI
  const isAntiPromosi = m.isGroup ? db.data.chats[m.chat].antipromosi : false;

 
  const promosiPola = [
    /(jual|promo|diskon|harga|order|ready|sedia|sewa|open)\s+(.*)?/i, // Misalnya: "jual barang", "promo besar", "ready stock"
    /(menerima|melayani|menyediakan|beli|kami menyediakan)\s+(.*)?/i, // Misalnya: "kami melayani jasa X"
    /(\btransaksi\b|\bpembayaran\b|\bnokos\b|\bdomain\b|\bpanel\b)/i, // Deteksi kata kunci sensitif
    /(open\s+(order|jasa|sewa))/i // Contoh frasa promosi seperti "open order"
  ];

  
  if (m.isGroup && isAntiPromosi) {
    const messageContent = m.budy ? m.budy.toLowerCase() : '';

   
    if (promosiPola.some(pattern => pattern.test(messageContent))) {
   
      if (m.isAdmin) {
        return m.reply('😎 Kamu admin grup, jadi Promosi ini tidak akan dihapus!');
      }

      if (!m.isBotAdmin) {
        return m.reply('Bot bukan admin, jadi tidak bisa menghapus pesan promosi.');
      }

      
      await m.reply(`\`\`\`「 Promosi Terdeteksi 」\`\`\`\nMaaf, pesan ini terdeteksi sebagai promosi dan akan dihapus sesuai pengaturan grup.`);

      
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Hapus pesan
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
};

module.exports = handler;