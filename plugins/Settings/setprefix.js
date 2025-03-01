let handler = async (m, { text, args, setReply }) => {
  if (!args[0]) throw "Masukkan prefix baru. Contoh: !setprefix !"; 
  
  const newPrefix = args[0]; 
  const multi = db.data.settings["settingbot"].multi; 

  if (multi) {
    throw "Setprefix hanya dapat digunakan saat Multi Prefix nonaktif. Matikan Multi Prefix terlebih dahulu.";
  }

  db.data.settings["settingbot"].prefix = newPrefix;
  setReply(`Berhasil mengubah prefix menjadi: ${newPrefix}`);
};

handler.command = ["setprefix"]; 
handler.owner = true; 
module.exports = handler;