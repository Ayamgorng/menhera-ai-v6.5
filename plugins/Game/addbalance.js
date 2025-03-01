let handler = async (m, { hanz,setReply, q }) => {
  try {
    // Validasi input
      let target = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted && m.quoted.sender 
      ? m.quoted.sender 
      : m.sender;
    if (!q || !target) return hanz.reply(m.chat, `Reply target dan masukkan jumlah saldo yang ingin diberikan\n\nContoh: .addbalance 5000`, m);
    if (isNaN(q)) return hanz.reply(m.chat, `Jumlah balance harus berupa angka`, m);

    // Proses penambahan saldo
      
    let jumlah = Math.floor(Number(q));
    global.db.data.users[target].balance += jumlah;

    // Balasan sukses
    hanz.reply(m.chat, `Berhasil menambahkan balance sebesar Rp ${jumlah.toLocaleString()} ke nomor ${target.split("@")[0]}`, m);
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, `Terjadi kesalahan saat memberikan saldo. Pastikan pengguna sudah terdaftar di database bot.`, m);
  }
};

handler.help = ['givesaldo'];
handler.tags = ['owner'];
handler.command = /^(addbalance)$/i;
handler.owner = true; 
handler.noCmdStore = true
handler.onlyGroup = true
module.exports = handler;
