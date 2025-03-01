const fetch = require('node-fetch');

let handler = async (m, { hanz, setReply, text }) => {
  if (!text) throw 'Harap masukkan URL anime.';

  try {
    let res = await fetch(`https://api.agatz.xyz/api/animeindod?url=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status !== 200 || !json.data || json.data.status !== 'success') {
      throw 'Data tidak ditemukan.';
    }

    let anime = json.data.animeData; // Mengambil data anime
    let message = `Judul: ${anime.title}\n` +
                  `Poster: ![Image](${anime.poster})\n` +
                  `Sinopsis: ${anime.synopsis}\n` +
                  `Genre: ${anime.genres.join(', ')}\n` +
                  `Episode:\n` +
                  `${anime.episodes.map(e => `- ${e.eps_title}: [Tonton](${e.eps_url})`).join('\n')}`;

    setReply(message);
  } catch (e) {
    setReply(`Terjadi kesalahan: ${e.message || e}`);
  }
};

handler.command = ['detailanimeindo'];
handler.tags = ['detail'];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;