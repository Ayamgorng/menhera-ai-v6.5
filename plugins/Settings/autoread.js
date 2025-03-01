let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off";

  const autoRead = db.data.settings["settingbot"].autoRead;

  if (q == "on") {
    if (autoRead) throw "Sudah on";
    db.data.settings["settingbot"].autoRead = true;
    setReply("Berhasil mengaktifkan autoRead");
  } else if (q == "off") {
    if (!autoRead) throw "Sudah off";
    db.data.settings["settingbot"].autoRead = false;
    setReply("Berhasil menonaktifkan autoRead");
  } else {
    throw "Pilihan tidak valid. Pilih antara 'on' atau 'off'.";
  }
};

handler.command = ["autoread"];
handler.owner = true;
module.exports = handler;