/* 
  ────────「 *RANGELOFFICIAL* 」──────── 
  Powered by *EhanzDhoanx* × *MENHERA MD* 
  Copyright © Raihan Fadillah 
  Instagram: @ehanzdhonax 

  ⚠️ *Jangan hapus watermark ini!* 
  Dukunganmu sangat berarti untuk kami! 
  ──────────────────────────────── 
*/


const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) throw 'Harap masukkan kata kunci pencarian.';

  try {
    let res = await fetch(`https://api.agatz.xyz/api/bukalapak?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status !== 200 || !json.data.length) {
      throw 'Tidak ada data ditemukan.';
    }

    let items = json.data;
    let message = '✨ **Hasil Pencarian:** ✨\n\n' + items.map((item, index) => {
      return `**${index + 1}. ${item.title}**\n` +
             `⭐ **Rating:** ${item.rating} | 🛒 **Terjual:** ${item.terjual}\n` +
             `💰 **Harga:** ${item.harga}\n` +
             `🏬 **Toko:** [${item.store.nama}](${item.store.link}) | 📍 **Lokasi:** ${item.store.lokasi}\n` +
             `🔗 **[Beli di sini](${item.link})**\n` +
             `![Image](${item.image})\n`;
    }).join('\n');

    m.reply(message);
  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e}`);
  }
};

handler.command = ['bukalapaksearch','bukalapak'];
handler.tags = ['search'];
handler.noCmdStore = true  
handler.onlyGroup = true

module.exports = handler;