const handler = async (m, { text,setReply }) => {
  let user = global.db.data.users[m.sender];
  if (!user || !user.registered) {
    return m.reply("Kamu belum terdaftar. Tidak ada akun yang bisa dihapus.");
  }
  if (text !== "yakin") {
    return setReply(`
❗ *Konfirmasi Diperlukan*

Apakah kamu yakin ingin keluar dari database bot dan menghapus akunmu?

Berikut detail akunmu:
• *Nama*  : ${user.name || "Tidak tersedia"}
• *Umur*  : ${user.age || "Tidak tersedia"}
• *Email* : ${user.email || "Tidak tersedia"}

Jika kamu yakin, ketik: *.unreg yakin*
    `);
  }
  user.registered = false;
  user.unreg = true;
  user.name = '';
  user.age = null;
  user.email = null;
  user.verificationCode = null;

 return setReply(`
🗑️ *Akun Anda Telah Berhasil Dihapus*
Seluruh data Anda telah dihapus dari sistem kami.  
Anda kini tidak lagi terdaftar sebagai pengguna bot ini.
✨ *Ingin Kembali?*  
Anda dapat mendaftar ulang kapan saja dengan menggunakan perintah *daftar*.
Terima kasih telah menjadi bagian dari kami. Kami berharap dapat melayani Anda lagi di masa depan!
`);
};

handler.command = /^(unreg|unregister|hapusakun)$/i;

module.exports = handler;