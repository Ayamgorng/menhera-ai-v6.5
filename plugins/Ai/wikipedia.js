const axios = require("axios");

let handler = async (m, { text, command }) => {
  if (!text) return m.reply(`Kirim perintah dengan format: \n\n*${command} [kata kunci]*\n\nContoh: *${command} JavaScript*`);

  const getWikipediaSummary = async (query) => {
   
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(url);
      if (response.data.extract) {
        return response.data.extract; 
      } else {
        return "Maaf, saya tidak menemukan informasi yang Anda cari.";
      }
    } catch (error) {
      console.error("Terjadi kesalahan:");
      return "Harap Masukan Kata Kunci Satu Kata Saja.";
    }
  };

 
  const summary = await getWikipediaSummary(text);
  m.reply(summary);
};

handler.help = ["aiwikipedia"];
handler.tags = ["internet", "ai"];
handler.command = ["aiwiki", "wikipedia"];

module.exports = handler;