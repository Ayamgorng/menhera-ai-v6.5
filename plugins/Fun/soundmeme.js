let fetch = require('node-fetch');

let handler = async (m, { setReply, hanz }) => {
  try {
    // Mengambil data dari API menggunakan method GET
    let response = await fetch("https://skizoasia.xyz/api/memes?apikey=Rangelofficial", {
      method: 'GET', // Menggunakan method GET
      headers: {
        'Content-Type': 'application/json', // Menyatakan tipe konten jika diperlukan
      },
    });
    
    if (!response.ok) throw new Error("Gagal mengambil data");

    let result = await response.json();
    if (!result || result.length === 0) throw new Error("Meme suara tidak tersedia");

    // Ambil meme suara acak dari daftar
    let meme = result[Math.floor(Math.random() * result.length)];
m.reply('_wait sedang mencari sound_')
    // Kirimkan informasi meme suara
    await setReply(`🎵 *${meme.title}* \n🔗 [Link](${meme.link})`);

    // Kirim audio
    await hanz.sendMessage(m.chat, {
      audio: { url: meme.audioUrl },
      mimetype: 'audio/mp4',
      ptt: true  // Opsi ini untuk mengirim sebagai pesan suara (PTT)
    },{quoted:m});

  } catch (error) {
    console.error(error);
    setReply("Maaf, terjadi kesalahan dalam mengambil meme suara.");
  }
};

handler.tags = ["fun"];
handler.command = ["soundmeme"];
handler.help = ["memesound"];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["random sound meme"]
module.exports = handler;
