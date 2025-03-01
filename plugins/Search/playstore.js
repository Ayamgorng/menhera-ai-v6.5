const axios = require('axios');

let handler = async (m, { text,setReply }) => {
  const query = text.split(" ").slice(1).join(" ");
  
  if (!text) {
    return m.reply("Mohon masukkan nama aplikasi yang ingin dicari di Play Store!");
  }

  try {
    const response = await axios.get(`https://api-lenwy.vercel.app/playstore?search=${encodeURIComponent(text)}`);
    const apps = response.data.data;

    if (!apps || apps.length === 0) {
      return m.reply("Maaf, tidak ditemukan aplikasi dengan nama tersebut.");
    }

    // Batasi hasil ke 3 aplikasi pertama untuk menghindari overload
    const result = apps.slice(0, 3).map(app => {
      return `
*Nama Aplikasi:* ${app.nama}
*Developer:* ${app.developer} [Developer Link](${app.link_dev})
*Rating:* ${app.rate2} (${app.rate})
*Link Aplikasi:* [Download](${app.link})
      `;
    }).join('\n\n');

    await setReply(result);
  } catch (error) {
    console.error("Error fetching Play Store data:", error);
    await m.reply("Maaf, terjadi kesalahan saat mengambil data aplikasi.");
  }
};

// Tambahkan command trigger agar handler ini merespons pada perintah ".playstore"
handler.command = /^\playstore/i;
handler.noCmdStroe = true
handler.onlyGroup = true;
module.exports = handler;
