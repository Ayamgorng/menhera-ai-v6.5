let handler = async (m, { setReply, args }) => {
  try {
    let number = args[0];
    if (!number) {
      return setReply("Harap masukkan nomor pengguna yang ingin dicek.\nContoh: .cekuser 6287792256898");
    }
    let userId = number.includes('@s.whatsapp.net') ? number : `${number}@s.whatsapp.net`;
    if (db.data.users[userId]) {
      let user = db.data.users[userId];
      let message = `*User Ditemukan:*\n`;
      message += `- Nomor: ${number}\n`;
      message += `- Nama: ${user.name || "No Name"}\n`;
      message += `- Ip: ${user.ip || "Tidak Ada"}\n`;
      message += `- Email: ${user.email || "Tidak Ada"}\n`;
      message += `- Serial: ${user.serial || "Tidak Ada"}\n`;
      message += `- Terdaftar: ${user.registered ? "Ya" : "Tidak"}\n`;
      message += `- Limit: ${user.limit || 0}\n`;
      message += `- GLimit: ${user.glimit || 0}\n`;
      message += `- Money: ${user.money || 0}\n`;
      message += `- Balance: ${user.balance || 0}\n`;
      message += `- Verified: ${user.date || "Tidak Ada"}`;
      setReply(message);
    } else {
      setReply(`User dengan nomor *${number}* tidak ditemukan di database.`);
    }
  } catch (error) {
    setReply("Terjadi kesalahan saat mencoba memeriksa user.");
    console.error(error);
  }
};

handler.help = ['cekuser <nomor>'];
handler.tags = ['settings'];
handler.command = ['cekuser'];
handler.owner = true;

module.exports = handler;