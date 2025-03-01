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

let handler = async (m, { hanz,setReply, text }) => {
  if (!text) throw 'Harap masukkan kata kunci pencarian.';

  try {
    let res = await fetch(`https://api.agatz.xyz/api/carisinyals?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status !== 200 || !json.data.length) {
      throw 'Tidak ada data ditemukan.';
    }

    let items = json.data;
    let message = '📱 **Hasil Pencarian Sinyal:** 📱\n\n' + items.map((item, index) => {
      return `${index + 1}. ${item.title}\n` +
             `💵 **Harga:** ${item.price || 'Tidak Tersedia'}\n` +
             `🔗 [Detail Produk](${item.link})\n` +
             `![Image](${item.thumbnail})\n`;
    }).join('\n');

    setReply(message);
  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e}`);
  }
};

handler.command = ['carisinyalsearch','carisinyal'];
handler.tags = ['search'];
handler.premium = false;
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;