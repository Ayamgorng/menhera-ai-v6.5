let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off";
  const autoblockcmd = db.data.settings["settingbot"].autoblockcmd;
  if (q == "on") {
    if (autoblockcmd) throw "Sudah on";
    db.data.settings["settingbot"].autoblockcmd = true;
    setReply("Berhasil  mengaktifkan autoblockcmd ");
  } else if (q == "off") {
    if (autoblockcmd) throw "Sudah off";
    db.data.settings["settingbot"].autoblockcmd = false;
    setReply("Berhasil  menonaktifkan autoblockcmd");
  }
};

handler.command = ["autoblockcmd"];
handler.owner = true;
module.exports = handler;