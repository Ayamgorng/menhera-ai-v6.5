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

let handler = async (m, { hanz, setReply, text }) => {
  if (!text) throw 'Harap masukkan kata kunci anime.';

  try {
    let res = await fetch(`https://api.agatz.xyz/api/animeindo?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status !== 200 || !json.data || json.data.status !== 'success') {
      throw 'Data anime tidak ditemukan.';
    }

    let anime = json.data.data[0]; 
    let message = `Judul Anime: ${anime.title}\n` +
                  `Link Anime: ${anime.link}\n` +
                  `Tayang: ${anime.release}\n` +
                  `Durasi: ${anime.duration}\n` +
                  `Sinopsis: ${anime.synopsis}`;

    setReply(message);
  } catch (e) {
    setReply(`Terjadi kesalahan: ${e.message || e}`);
  }
};

handler.command = ['animeindoserach','animeindo'];
handler.tags = ['search'];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["search anime"]
module.exports = handler;