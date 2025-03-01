const handler = async (m, { hanz, args, text, setReply }) => {
  if (!m.isGroup) return setReply("Fitur ini hanya bisa digunakan di dalam grup.");
  if (!text) return setReply('*CEKKONTOL* Izmi begitu!');

  const responses = [
    "Hadehh🤦\n[ Dah Item Bauk Lagi ishh🤮 ]",
    "9%\n\nMasih Kecil Ini Mah Ketutup Ama bulu komt nya🗿 Ae",
    "Nakk Masih Kecil, jangan kebanyakan nonton film dewasa ya!",
    "28%\n\nYoalahh hmm, mungkin masih perlu banyak belajar.",
    "34%\n\nMayan Lah, tapi jangan baper ya!",
    "48%\n\nGatau, kayaknya ini sih dari katalog 'biasa'!",
    "59%\n\nBiasa Kang Coli Mah Tityd nya Item🗿, ada yang mau berbagi tips?",
    "Apacoba\nKasian Mana Masih Muda, ayo jangan terjebak!",
    "Itu tityd apa terong? Ayo kita panggang!",
    "Ya Ampun, mau jadi juragan tityd atau gimana?"
  ];

  // Pilih jawaban acak
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  const replyText = Ehztext(`Cekkontol : *${text}*\nJawaban: ${randomResponse}`);

  setReply(replyText);
};

handler.help = ["cekkontol"];
handler.tags = ["primbon"];
handler.command = ["cekkontol"];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["cek komtol seseorang"]
module.exports = handler;
