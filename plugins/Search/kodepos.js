const fetch = require('node-fetch');

let handler = async (m, { hanz, setReply,text }) => {
  if (!text) throw 'Harap masukkan nama kota atau kelurahan.';

  try {
    // Mengambil data dari API
    let res = await fetch(`https://api.agatz.xyz/api/kodepos?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    // Memeriksa status respon dari API
    if (json.status !== 200 || !json.data || json.data.length === 0) {
      throw 'Data tidak ditemukan atau terjadi kesalahan.';
    }

    // Mengambil data kode pos dari API
    let data = json.data;
    let message = `Kode Pos untuk "${text}":\n`;

    // Menyusun pesan dengan semua informasi yang ditemukan
    for (let item of data) {
      message += `- Kode Pos: ${item.kode_pos}\n` +
                 `  Kelurahan: ${item.kelurahan}\n` +
                 `  Kecamatan: ${item.kecamatan}\n` +
                 `  Kota: ${item.kota}\n` +
                 `  Provinsi: ${item.provinsi}\n` +
                 `  Zona Waktu: ${item.zona_waktu}\n` +
                 `  Lintang: ${item.lintang}\n` +
                 `  Bujur: ${item.bujur}\n` +
                 `  Elevasi: ${item.elevasi}\n\n`;
    }

    // Mengirim pesan dengan daftar kode pos
      setReply(message)
    /*await hanz.sendMessage(m.chat, {
      text: message,
    });*/

  } catch (e) {
    // Menangani kesalahan dan mengirimkan pesan kesalahan
    await hanz.sendMessage(m.chat, `Terjadi kesalahan: ${e.message || e}`);
  }
};

// Menetapkan nama command dan tag
handler.command = ['kodepos'];
handler.tags = ['info'];
handler.noCmdStroe = true
handler.onlyGroup = true;
module.exports = handler;