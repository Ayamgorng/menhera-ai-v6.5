let handler = async (m, { hanz, args, q}) => {
  try {
    if (!args[0]) {
      return hanz.reply(m.chat, `❌ *Contoh penggunaan:*\n.laporerror menu tidak muncul`, m);
    }
    
    let pesanError = q.split('|')[0];
    let pesan = `╭─❒ *Laporan Bug* ❒─╮
📨 *Pesan:* ${pesanError}
👤 *Pengirim:* @${m.sender.split('@')[0]}
${m.isGroup ? `👥 *Grup:* ${await hanz.getName(m.chat)}` : ''}
╰─────────────────╯`;

   
    hanz.reply(m.chat, `✅ *Terima kasih!*\nLaporan bugmu sudah terkirim ke Owner. Kami akan segera menindaklanjuti.`, m);

    
    hanz.sendMessage(global.nomerOwner + "@s.whatsapp.net", {
      image: { url: `${getRandom(global.fotoRandom)}` },
      caption: pesan,
      mentions: [m.sender],
    });
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, `❌ Terjadi kesalahan saat mengirim laporan.`, m);
  }
};

handler.help = ['laporerror'];
handler.tags = ['info'];
handler.command = /^(laporerror)$/i;

module.exports = handler;
