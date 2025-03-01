let handler = async (m, { hanz, q, }) => {
  try {
    // Validasi input
    if (!q || !m.mentionByReply) return hanz.reply(m.chat, `Reply target dan masukkan jumlah saldo yang ingin dikurangi\n\nContoh: .kurangsaldo 5000`, m);
    if (isNaN(q)) return hanz.reply(m.chat, `Jumlah saldo harus berupa angka`, m);

    // Proses pengurangan saldo
    let target = m.mentionByReply;
    let jumlah = Math.floor(Number(q));

    if (global.db.data.users[target].balance < jumlah) {
      return hanz.reply(m.chat, `Saldo pengguna tidak mencukupi untuk dikurangi sebesar Rp ${jumlah.toLocaleString()}`, m);
    }

    global.db.data.users[target].balance -= jumlah;

    // Balasan sukses
    hanz.reply(m.chat, `Berhasil mengurangi saldo sebesar Rp ${jumlah.toLocaleString()} dari nomor ${target.split("@")[0]}`, m);
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, `Terjadi kesalahan saat mengurangi saldo. Pastikan pengguna sudah terdaftar di database bot.`, m);
  }
};

handler.help = ['kurangsaldo'];
handler.tags = ['owner'];
handler.command = /^(kurangbalance)$/i;
handler.owner = true; 
handler.noCmdStore = true
handler.onlyGroup = true
module.exports = handler;
