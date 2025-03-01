let handler = async (m, { text, isAdmin, setReply }) => {
  
  if (!text || (text !== "aktif" && text !== "nonaktif")) {
    return setReply("Gunakan format: .setautonotifsholat [aktif/nonaktif]");
  }

  const chatId = m.chat;
  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.autonotifSholat) global.db.data.others.autonotifSholat = {};

 
  if (text === "aktif") {
    global.db.data.others.autonotifSholat[chatId] = { status: true };
    return setReply("✅ Autonotif sholat telah diaktifkan untuk grup ini.\n\nSilakan *.addnotifsholat* Jika Belum Menambahkan Waktu Jadwal Sholat");
  }


  if (text === "nonaktif") {
    global.db.data.others.autonotifSholat[chatId] = { status: false };
    return setReply("❌ Autonotif sholat telah dinonaktifkan untuk grup ini.");
  }
};

handler.tags = ["admin"];
handler.command = ["autonotifsholat"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;