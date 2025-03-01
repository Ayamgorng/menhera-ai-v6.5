let handler = async (m, { text, setReply }) => {
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

  if (!text || isNaN(text)) {
    return setReply("Format salah! Gunakan: .delnotifprivate <urutan>\nContoh: .delnotifprivate 1");
  }

  const index = parseInt(text) - 1; 
  if (index < 0 || index >= notipPrivateList.length) {
    return setReply(`Nomor urutan tidak valid! Pilih antara 1 hingga ${notipPrivateList.length}.`);
  }

  const notifToRemove = notipPrivateList[index];
  global.db.data.others.notipPrivate = global.db.data.others.notipPrivate.filter(
    (notif) => !(notif.nomorTujuan === nomorTujuan && notif.notifikasiName === notifToRemove.notifikasiName)
  );

  setReply(`Notifikasi private "${notifToRemove.notifikasiName}" berhasil dihapus.`);
};

handler.tags = ["admin"];
handler.command = ["delnotifprivate"]; 
handler.private = true; 

module.exports = handler;