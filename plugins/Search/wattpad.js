const fetch = require('node-fetch');

let handler = async (m, { hanz, setReply, text }) => {
  if (!text) throw 'Harap masukkan kata kunci cerita.';

  try {
    let res = await fetch(`https://api.agatz.xyz/api/wattpad?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (json.status !== 200 || !json.data) {
      throw 'Data tidak ditemukan untuk cerita tersebut.';
    }

    let cerita = json.data[0]; // Mengambil cerita pertama dari array
    let message = `📖 **Judul Cerita:** ${cerita.title}\n` +
                  `📝 **Deskripsi:** ${cerita.desc}\n` +
                  `👁️ **Dibaca:** ${cerita.reads}\n` +
                  `⭐ **Vote:** ${cerita.vote}\n` +
                  `📚 **Jumlah Chapter:** ${cerita.chapter}\n` +
                  `🔗 **[Link Cerita](${cerita.link})**\n` +
                  `🖼️ **Thumbnail:** ![Image](${cerita.thumb})`;

    setReply(message);
  } catch (e) {
    setReply(`Terjadi kesalahan: ${e}`);
  }
};

handler.command = ['wattpad'];
handler.tags = ['search'];

module.exports = handler;