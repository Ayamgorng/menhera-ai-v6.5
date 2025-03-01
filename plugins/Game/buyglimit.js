let handler = async (m, { hanz,prefix, setReply,q }) => {
  try {
    // Validasi input
    if (!q) return hanz.reply(m.chat, `Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = Rp 700`, m);
    if (q.includes('-')) return hanz.reply(m.chat, `Jangan menggunakan tanda minus (-)`, m);
    if (isNaN(q)) return hanz.reply(m.chat, `Harus berupa angka`, m);

    // Hitung jumlah yang ingin dibeli
    let ane = Number(Math.floor(q) * 700);
    if (global.db.data.users[m.sender].balance < ane) return hanz.reply(m.chat, `Saldo kamu tidak mencukupi untuk pembelian ini`, m);

    // Proses pembelian
    global.db.data.users[m.sender].balance -= ane;
    global.db.data.users[m.sender].glimit += Math.floor(q);

    // Balasan
    let teks = Ehztext(`Pembelian game limit sebanyak ${q} berhasil\n\nSisa Saldo : Rp ${global.db.data.users[m.sender].balance.toLocaleString()}\nSisa Game Limit : ${global.db.data.users[m.sender].glimit}`)
    setReply(teks)
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, `Terjadi kesalahan saat memproses pembelian game limit.`, m);
  }
};

handler.help = ['buyglimit'];
handler.tags = ['limit'];
handler.command = /^(buyglimit)$/i;
handler.noCmdStore = true
handler.onlyGroup = true
module.exports = handler;
