let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off"; // Validasi input
  q = q.toLowerCase(); // Normalisasi input

  // Pastikan data setting ada
  if (!db.data.settings || !db.data.settings["settingbot"]) {
    throw "Pengaturan bot tidak ditemukan.";
  }

  const autoSticker = db.data.settings["settingbot"].autoSticker;

  if (q === "on") {
    if (autoSticker) throw "Autosticker sudah aktif.";
    db.data.settings["settingbot"].autoSticker = true;
    setReply("Berhasil mengaktifkan autosticker.");
  } else if (q === "off") {
    if (!autoSticker) throw "Autosticker sudah nonaktif.";
    db.data.settings["settingbot"].autoSticker = false;
    setReply("Berhasil menonaktifkan autosticker.");
  } else {
    throw "Input tidak valid. Gunakan 'on' atau 'off'.";
  }
};

handler.command = ["autosticker"];
handler.owner = true;

module.exports = handler;