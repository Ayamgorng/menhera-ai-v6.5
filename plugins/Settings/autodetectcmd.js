let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off";

  const autoDetectCmd = db.data.settings["settingbot"].autoDetectCmd;

  if (q == "on") {
    if (autoDetectCmd) throw "Sudah on";
    db.data.settings["settingbot"].autoDetectCmd = true;
    setReply("Berhasil mengaktifkan autoDetectCmd");
  } else if (q == "off") {
    if (!autoDetectCmd) throw "Sudah off";
    db.data.settings["settingbot"].autoDetectCmd = false;
    setReply("Berhasil menonaktifkan autoDetectCmd");
  } else {
    throw "Pilihan tidak valid. Pilih antara 'on' atau 'off'.";
  }
};

handler.command = ["autodetectcmd"];
handler.owner = true;
module.exports = handler;