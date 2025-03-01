let handler = async (m, { hanz, q,}) => {
  try {
    // Validasi input
    if (!q || !m.mentionByReply) 
      return hanz.reply(
        m.chat, 
        `Reply target dan masukkan jumlah limit yang ingin diberikan.\n\nContoh: .givelimit 10`, 
        m
      );
    if (isNaN(q)) return hanz.reply(m.chat, `Jumlah limit harus berupa angka`, m);

    // Proses penambahan limit
    let target = m.mentionByReply;
    let jumlah = Math.floor(Number(q));

    global.db.data.users[target].limit += jumlah;

    // Balasan sukses
    hanz.reply(m.chat, `Berhasil menambahkan ${jumlah} limit ke nomor ${target.split("@")[0]}`, m);
  } catch (err) {
    console.error(err);
    hanz.reply(
      m.chat, 
      `Terjadi kesalahan saat menambahkan limit. Pastikan pengguna sudah terdaftar di database bot.`, 
      m
    );
  }
};

handler.help = ['givelimit'];
handler.tags = ['owner'];
handler.command = /^(givelimit)$/i;
handler.owner = true; 
handler.onlyGroup = true
handler.noCmdStore = true
module.exports = handler;
