function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const handler = async (m, { text,sendAnti }) => {
  if (!global.db || !global.db.data || !global.db.data.users) {
    return m.reply("Database pengguna tidak tersedia.");
  }

  let user = global.db.data.users[m.sender];
  if (!user) {
    return m.reply("Pengguna tidak ditemukan di database. Silakan daftar terlebih dahulu.");
  }
  if (!user.verificationCode) {
    return m.reply("Kamu belum melakukan pendaftaran atau kode verifikasi belum dikirim.");
  }
  if (!text) {
    return m.reply("Harap masukkan kode verifikasi.");
  }
  if (text === user.verificationCode) {
    user.registered = true;
    user.verificationCode = null; 
  let sn = makeid(6);
    let userDetails = `
✅ *SUCCES*

Berikut adalah detail akun kamu:

• *Nama* : ${user.name || 'Tidak tersedia'}
• *Umur* : ${user.age || 'Tidak tersedia'} tahun
• *Email* : ${user.email || 'Tidak ada email yang terdaftar'}
• *Nomor Seri* : ${sn || 'Tidak ada nomor seri'}
• *Status* : ✅ Terverifikasi

Kamu sekarang bisa menggunakan fitur-fitur eksklusif dari bot ini!`;
    return sendAnti(userDetails);
  } else {
    return m.reply("Kode verifikasi salah. Silakan coba lagi.");
  }
};

handler.command = /^(verifikasi|verify)$/i;

module.exports = handler;