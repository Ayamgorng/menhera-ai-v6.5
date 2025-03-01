const moment = require('moment');

let handler = async (m, { text, setReply }) => {
  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.notipPrivate) global.db.data.others.notipPrivate = [];
  if (!global.db.data.others.timePrivate) global.db.data.others.timePrivate = [];

  const args = text.split("|").map((v) => v.trim());
  if (args.length < 2) {
    return setReply("Format salah! Gunakan: .addnotifprivate <jam>|<nama notifikasi>|[pesan]\nContoh: .addnotifprivate 12:00|Ulang Tahun|Selamat ulang tahun!");
  }

  const time = args[0]; 
  const notifikasiName = args[1];  
  const teks = args[2] || "Tidak ada pesan";  
  const nomorTujuan = m.sender; 
  const chatId = m.chat;

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time)) {
    return setReply("Format waktu salah! Gunakan format HH:mm (contoh: 12:00).");
  }

  
  const existingNotif = global.db.data.others.notipPrivate.find(
    (notif) => notif.chatId === chatId && notif.nomorTujuan === nomorTujuan && notif.notifikasiName === notifikasiName
  );
  if (existingNotif) {
    existingNotif.time = time;
    existingNotif.teks = teks;
    setReply(`Notifikasi private "${notifikasiName}" untuk nomor ${nomorTujuan} diperbarui ke waktu ${time} dengan pesan: "${teks}".`);
  } else {
    global.db.data.others.notipPrivate.push({ chatId, nomorTujuan, time, teks, notifikasiName });
    setReply(`Notifikasi private "${notifikasiName}" berhasil disetel untuk nomor ${nomorTujuan} pada waktu ${time} dengan pesan: "${teks}".`);
  }

 
  if (!global.db.data.others.timePrivate.includes(chatId)) {
    global.db.data.others.timePrivate.push(chatId);
  }
};

handler.tags = ["admin"];
handler.command = ["addnotifprivate"];  
handler.private = true; 
handler.register = true

module.exports = handler;