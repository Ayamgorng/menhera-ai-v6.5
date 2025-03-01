const fetch = require('node-fetch');

let handler = async (m, { hanz, setReply }) => {
  try {
    let res = await fetch(`https://api.agatz.xyz/api/otakulatest`);
    let json = await res.json();

    if (json.status !== 200 || !json.data || !json.data.rumah) {
      throw 'Data terbaru tidak ditemukan.';
    }

    let ongoing = json.data.rumah['sedang berlangsung'];
    let message = '📺 **Anime Terbaru:**\n\n';

    ongoing.forEach(anime => {
      message += `🎥 **Judul:** ${anime.judul}\n` +
                 `📺 **${anime.episode}**\n` +
                 `📅 **Diunggah pada:** ${anime.uploaded_on} (${anime.day_updated})\n` +
                 `🔗 **[Link Anime](${anime.tautan})**\n` +
                 `🖼️ **Thumbnail:** ![Image](${anime.jempol})\n\n`;
    });

    setReply(message);
  } catch (e) {
    setReply(`Terjadi kesalahan: ${e.message || e}`);
  }
};

handler.command = ['otakudesulatest'];
handler.tags = ['latest'];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["melihat detail anime"]
module.exports = handler;