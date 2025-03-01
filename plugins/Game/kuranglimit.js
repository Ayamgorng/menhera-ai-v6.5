let handler = async (m, { hanz, q,}) => {
  try {
    // Validasi input
    if (!q || !m.mentionByReply)
      return hanz.reply(
        m.chat,
        `Reply target dan masukkan jumlah limit yang ingin dikurangi.\n\nContoh: .kuranglimit 5`,
        m
      );
    if (isNaN(q)) return hanz.reply(m.chat, `Jumlah limit harus berupa angka`, m);

    // Proses pengurangan limit
    let target = m.mentionByReply;
    let jumlah = Math.floor(Number(q));

    // Pastikan limit tidak menjadi negatif
    if (global.db.data.users[target].limit < jumlah)
      return hanz.reply(
        m.chat,
        `Pengurangan gagal. Limit pengguna tidak mencukupi.`,
        m
      );

    global.db.data.users[target].limit -= jumlah;

    // Balasan sukses
    hanz.reply(
      m.chat,
      `Berhasil mengurangi ${jumlah} limit dari nomor ${target.split("@")[0]}`,
      m
    );
  } catch (err) {
    console.error(err);
    hanz.reply(
      m.chat,
      `Terjadi kesalahan saat mengurangi limit. Pastikan pengguna sudah terdaftar di database bot.`,
      m
    );
  }
};

handler.help = ['kuranglimit'];
handler.tags = ['owner'];
handler.command = /^(kuranglimit)$/i;
handler.owner = true; 
handler.onlyGroup = true
handler.noCmdStore = true
module.exports = handler;
