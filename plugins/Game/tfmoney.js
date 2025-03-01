let handler = async (m, { hanz,setReply, args, command }) => {
  try {
    // Validasi input
    if (!args[0] || isNaN(args[0])) {
      return conn.reply(m.chat, `Masukkan jumlah Money yang ingin ditransfer.\nContoh: .${command} 100`, m);
    }
    
    if (!m.quoted || !m.quoted.sender) {
      return setReply("Silakan reply ke pesan target pengguna yang ingin ditransfer saldo.");
    }

    let amount = parseInt(args[0]);
    if (amount < 100) {
      return setReply("Minimal transfer adalah 100 rupiah.");
    }

    let sender = m.sender;
    let receiver = m.quoted.sender;

    // Periksa saldo pengguna pengirim
    if (global.db.data.users[sender].money < amount) {
      return setReply(`Money kamu tidak mencukupi untuk transfer sebesar Rp.${amount.toLocaleString()}.`);
    }

    // Validasi penerima
    if (!global.db.data.users[receiver]) {
      return setReply(`User tersebut belum terdaftar di database bot. Silakan minta mereka mengetik .menu terlebih dahulu.`);
    }

    // Proses transfer
    global.db.data.users[sender].money -= amount;
    global.db.data.users[receiver].money += amount;

    // Balasan sukses
    return hanz.reply(
      m.chat,
      `✅ Berhasil mentransfer money sebesar Rp.${amount.toLocaleString()} ke nomor ${receiver.split("@")[0]}.`,
      m
    );
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, "❌ Terjadi kesalahan saat melakukan transfer.", m);
  }
};

handler.help = ['transfer <jumlah>'];
handler.tags = ['finance'];
handler.command = ['tfmoney']; 
handler.noCmdStore = true
handler.onlyGroup = true
module.exports = handler;
