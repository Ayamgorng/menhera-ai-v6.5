let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off";
  const autoReport = db.data.settings["settingbot"].autoReport;
  if (q == "on") {
    if (autoReport) throw "Sudah on";
    db.data.settings["settingbot"].autoReport = true;
    setReply("Berhasil  mengaktifkan autoReport ");
             
  } else if (q == "off") {
    if (autoReport) throw "Sudah off";
    db.data.settings["settingbot"].autoReport = false;
    setReply("Berhasil  menonaktifkan autoReport");
  }
};

handler.command = ["autoreport"];
handler.owner = true;
module.exports = handler;