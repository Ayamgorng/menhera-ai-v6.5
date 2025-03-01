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
  if (!text) throw 'Harap masukkan URL produk.';

  try {
    let res = await fetch(`https://api.agatz.xyz/api/carisinyald?url=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status !== 200 || !json.data) {
      throw 'Data tidak ditemukan untuk URL tersebut.';
    }

    let item = json.data;
    let message = `📱 **Detail Produk:** ${item.nama}\n\n` +
                  `💵 **Harga:** ${item.harga || 'Tidak Tersedia'}\n` +
                  `🖼️ **Thumbnail:** ![Image](${item.thumbnail})\n\n` +
                  `🌟 **Fitur Unggulan:**\n` +
                  `${item.fiturUnggulan.map(f => `- ${f}`).join('\n')}\n\n` +
                  `🔍 **Spesifikasi:**\n` +
                  `${Object.entries(item.spesifikasi).map(([key, value]) => `**${key}:** ${value}`).join('\n')}\n\n` +
                  `🔗 **[Kelebihan dan Kekurangan](${item.informasiTambahan.kKelebihanKekurangan})**`;

    m.reply(message);
  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e}`);
  }
};

handler.command = ['carisinyaldetail','sinyaldetail'];
handler.tags = ['search'];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;