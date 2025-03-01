let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off";

  const anticulik = db.data.settings["settingbot"].anticulik;

  if (q == "on") {
    if (anticulik) throw "Sudah on";
    db.data.settings["settingbot"].anticulik = true;
    setReply("Berhasil mengaktifkan anticulik bot");
  } else if (q == "off") {
    if (!anticulik) throw "Sudah off";
    db.data.settings["settingbot"].anticulik = false;
    setReply("Berhasil menonaktifkan anticulik bot");
  } else {
    throw "Pilihan tidak valid. Pilih antara 'on' atau 'off'.";
  }
};

handler.command = ["anticulik"];
handler.owner = true;
module.exports = handler