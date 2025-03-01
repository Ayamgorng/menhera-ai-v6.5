const fetch = require('node-fetch');

let handler = async (m, { hanz, setReply, text }) => {
  if (!text) throw 'Harap masukkan kata kunci anime.';

  try {
    let res = await fetch(`https://api.agatz.xyz/api/otakudesu?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status !== 200 || !json.data || !json.data.search_results) {
      throw 'Data tidak ditemukan untuk anime tersebut.';
    }

    let anime = json.data.search_results[0]; 
    let genres = anime.genre_list.map(genre => genre.genre_title).join(', ');
    let message = `🎥 **Judul Anime:** ${anime.title}\n` +
                  `📡 **Status:** ${anime.status}\n` +
                  `⭐ **Skor:** ${anime.score}\n` +
                  `🗂️ **Genre:** ${genres}\n` +
                  `🔗 **[Link Anime](${anime.link})**\n` +
                  `🖼️ **Thumbnail:** ![Image](${anime.thumb})`;

    setReply(message);
  } catch (e) {
    setReply(`Terjadi kesalahan: ${e} silakan masukan kata kunci anime yang lain dan benar`);
  }
};

handler.command = ['otakudesusearch'];
handler.tags = ['anime'];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["serach anime dari otakudesu"]
module.exports = handler;