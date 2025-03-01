let handler = async (m, { setReply }) => {
  if (!global.db.data.others || !global.db.data.others.notipPrivate) {
    return setReply("Belum ada notifikasi private yang disetel.");
  }

  const nomorTujuan = m.sender;
  const notipPrivateList = global.db.data.others.notipPrivate.filter(
    (notif) => notif.nomorTujuan === nomorTujuan
  );

  if (notipPrivateList.length === 0) {
    return setReply("Kamu belum memiliki notifikasi private yang disetel.");
  }

  let teksList = `*📋 Daftar Notifikasi Private:*\n\n`;
  notipPrivateList.forEach((notif, index) => {
    teksList += `*${index + 1}. Nama Notifikasi:* ${notif.notifikasiName}\n`;
    teksList += `   🕒 *Waktu:* ${notif.time}\n`;
    teksList += `   💬 *Pesan:* ${notif.teks}\n\n`;
  });

  setReply(teksList.trim());
};

handler.tags = ["admin"];
handler.command = ["listnotifprivate"]; 
handler.private = true;

module.exports = handler;