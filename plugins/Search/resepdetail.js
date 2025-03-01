const fetch = require('node-fetch');

let handler = async (m, { hanz, text, usedPrefix, command }) => {
  // Jika tidak ada URL yang diberikan
  if (!text) throw `Masukkan URL resep.\nContoh: ${usedPrefix + command} https://resepkoki.id/resep/resep-ikan-bawal-bakar/`;

  m.reply('Mencari resep...');

  try {
    let apiUrl = `https://api.agatz.xyz/api/resepd?url=${encodeURIComponent(text)}`;
    let res = await fetch(apiUrl);

    // Periksa status respons
    if (!res.ok) throw 'Gagal mengambil data dari API';

    let json = await res.json();
    console.log('API Response:', json); // Log respons dari API

    if (json.status !== 200) throw 'Gagal mengambil data dari API';

    let recipe = json.data; // Mengakses data resep langsung

    // Pastikan data resep ada
    if (!recipe) throw 'Resep tidak ditemukan.';

    let caption = `*Judul:* ${recipe.judul || 'Tidak ada judul'}\n` +
                  `*Waktu Masak:* ${recipe.waktu_masak || 'Tidak ada informasi waktu masak'}\n` +
                  `*Hasil:* ${recipe.hasil || 'Tidak ada informasi hasil'}\n` +
                  `*Tingkat Kesulitan:* ${recipe.tingkat_kesulitan || 'Tidak ada tingkat kesulitan'}\n` +
                  `*Bahan-bahan:*\n${recipe.bahan || 'Tidak ada bahan'}\n` +
                  `*Langkah-langkah:*\n${recipe.langkah_langkah || 'Tidak ada langkah-langkah'}\n`;

    await hanz.sendMessage(m.chat, {
      text: caption
    }, { quoted: m });

  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e.message || 'Kesalahan tidak terduga'}`);
  }
};

handler.help = ['resepd'];
handler.tags = ['internet'];
handler.command = ['resepd','resepdetail']
handler.noCmdStroe = true
handler.onlyGroup = true;

module.exports = handler;