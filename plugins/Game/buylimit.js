let handler = async (m, { hanz,prefix,q,setReply }) => {
  try {
    // Validasi input
    if (!q) return setReply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = Rp1000`);
    if (q.includes('-')) return hanz.reply(m.chat, `Jangan menggunakan tanda minus (-)`, m);
    if (isNaN(q)) return hanz.reply(m.chat, `Harus berupa angka`, m);
    
    // Hitung jumlah yang ingin dibeli
    let ane = Number(Math.floor(q) * 1000);
    if (global.db.data.users[m.sender].balance < ane) return hanz.reply(m.chat, `Saldo kamu tidak mencukupi untuk pembelian ini`, m);

    // Proses pembelian
    global.db.data.users[m.sender].balance -= ane;
    global.db.data.users[m.sender].limit += Math.floor(q);

    // Balasan
    setReply(`Pembelian limit sebanyak ${q} berhasil\n\nSisa Saldo : Rp ${global.db.data.users[m.sender].balance.toLocaleString()}\nSisa Limit : ${global.db.data.users[m.sender].limit}`);
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, `Terjadi kesalahan saat memproses pembelian limit.`, m);
  }
};

handler.help = ['buylimit'];
handler.tags = ['limit'];
handler.command = /^(buylimit)$/i;
handler.noCmdStore = true
handler.onlyGroup = true

module.exports = handler;
