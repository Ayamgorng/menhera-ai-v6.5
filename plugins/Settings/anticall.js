let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off";

  const anticall = db.data.settings["settingbot"].anticall;

  if (q == "on") {
    if (anticall) throw "Sudah on";
    db.data.settings["settingbot"].anticall = true;
    setReply("Berhasil mengaktifkan anticall bot");
  } else if (q == "off") {
    if (!anticall) throw "Sudah off";
    db.data.settings["settingbot"].anticall = false;
    setReply("Berhasil menonaktifkan anticall bot");
  } else {
    throw "Pilihan tidak valid. Pilih antara 'on' atau 'off'.";
  }
};

handler.command = ["anticall"];
handler.owner = true;
module.exports = handler