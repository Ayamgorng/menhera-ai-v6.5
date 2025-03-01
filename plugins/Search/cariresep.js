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

let handler = async (m, { hanz, text, usedPrefix,setReply, command }) => {
  if (!text) throw `Masukkan nama resep yang ingin dicari.\nContoh: ${usedPrefix + command} ikan goreng`;

  m.reply('Mencari resep...');

  try {
    let apiUrl = `https://api.agatz.xyz/api/resep?message=${encodeURIComponent(text)}`;
    let res = await fetch(apiUrl);

    // Periksa status respons
    if (!res.ok) throw 'Gagal mengambil data dari API';

    let json = await res.json();
    console.log('API Response:', json); // Log respons dari API

    if (json.status !== 200) throw 'Gagal mengambil data dari API';

    let recipes = json.data.data; // Akses array resep di dalam objek data

    // Pastikan recipes ada dan adalah array
    if (!recipes || !Array.isArray(recipes) || recipes.length === 0) {
      throw 'Tidak ada resep ditemukan.';
    }

    let caption = recipes.map(recipe => 
      `*Judul:* ${recipe.judul || 'Tidak ada judul'}\n*Link:* ${recipe.link || 'Tidak ada link'}\nSilakan Kirim Perintah .resepdetail *link* untuk cek resep anda`
    ).join('\n---\n'); // Menggabungkan semua resep
setReply(caption)
   /* await hanz.sendMessage(m.chat, {
      text: caption
    }, { quoted: m });*/

  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e.message || 'Kesalahan tidak terduga'}`);
  }
};

handler.help = ['resepsearch'];
handler.tags = ['internet'];
handler.command = /^cariresep$/i;
handler.noCmdStore = true  
handler.onlyGroup = true

module.exports = handler;