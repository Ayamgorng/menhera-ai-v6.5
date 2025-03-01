const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) throw 'Harap masukkan kata kunci pencarian stiker.';

  try {
    let res = await fetch(`https://api.agatz.xyz/api/sticker?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status !== 200 || !json.data.sticker_url.length) {
      throw 'Tidak ada stiker ditemukan.';
    }

    let stickers = json.data.sticker_url;
    let message = 'Link stiker:\n' + stickers.join('\n');

    await hanz.sendMessage(m.chat, { text: message }, { quoted: m });
  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e.message}`);
  }
};

handler.command = ['stickersearch'];
handler.tags = ['sticker'];
handler.noCmdStroe = true
handler.onlyGroup = true;

module.exports = handler;