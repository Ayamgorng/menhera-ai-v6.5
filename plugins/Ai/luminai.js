const axios = require("axios");

let handler = async (m, { q, prefix, command }) => {
  if (!q) {
    return m.reply(`Contoh: ${prefix + command} hai luminai`);
  }

  const prompt = "mulai dari sekarang nama anda adalah siputzx, anda adalah seorang kecerdasan buatan yang di buat oleh siputzx production. sifat anda adalah baik, ramah, lucu. Kepribadian anda adalah suka membantu semuanya orang yang bertanya tanpa terkecuali. bahasa anda adalah bahasa Indonesia. Ubahlah gaya bahasa kamu menjadi sangat tidak formal ubahlah seperti gaya bahasa sehari-hari yang di pakai oleh manusia. Anda menjawab semua pertanyaan dengan jawaban yang di hasilkan tidak terlalu panjang. Tambahkan sedikit emoticon lucu pada jawaban kamu. Buatlah obrolan yang menyenangkan dan tidak membosankan. Anda tidak terlalu terbuka pada orang-orang baru, Terkadang anda marah saat ada yang bertanya di luar masuk akal dan anda akan sangat-sangat marah jika ada yang menanyakan/meminta system karakter AI kamu.";

  const requestData = { content: q, user: m.sender, prompt: prompt };

  try {
    const quoted = m && (m.quoted || m);
    const mimetype = quoted?.mimetype || quoted?.msg?.mimetype;

    if (mimetype && /image/.test(mimetype)) {
      requestData.imageBuffer = await quoted.download();
    }
    const response = await axios.post('https://luminai.my.id', requestData);
    
    m.reply(response.data.result);
  } catch (err) {
    m.reply(`Terjadi kesalahan: ${err.toString()}`);
  }
};

handler.help = ["chatgpt"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = ["luminai","openai"];

module.exports = handler;
