let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off";
  const autoBio = db.data.settings["settingbot"].autoBio;
  if (q == "on") {
    if (autoBio) throw "Sudah on";
    db.data.settings["settingbot"].autoBio = true;
    setReply("Berhasil  mengaktifkan autobBio ");
             
  } else if (q == "off") {
    if (autoBio) throw "Sudah off";
    db.data.settings["settingbot"].autoBio = false;
    setReply("Berhasil  menonaktifkan autoBio");
  }
};

handler.command = ["autobio"];
handler.owner = true;
module.exports = handler;