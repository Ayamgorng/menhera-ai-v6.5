let handler = async (m, { text, q, hanz, setReply }) => {
  if (!q) throw "Pilih on atau off"; 

  const multi = db.data.settings["settingbot"].multi; 

  if (q == "on") {
    if (multi) throw "Multi prefix sudah aktif"; 
    db.data.settings["settingbot"].multi = true; 
    setReply("Berhasil mengaktifkan Multi Prefix");
  } else if (q == "off") {
    if (!multi) throw "Multi prefix sudah nonaktif"; 
    db.data.settings["settingbot"].multi = false; 
    setReply("Berhasil menonaktifkanMulti Prefix");
  } else {
    throw "Argumen tidak valid. Gunakan 'on' atau 'off'"; 
  }
};

handler.command = ["multiprefix"]
handler.owner = true; 
module.exports = handler;