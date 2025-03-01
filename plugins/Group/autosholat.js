let handler = async (m, { text, setReply }) => {
  if (!text || (text !== "aktif" && text !== "nonaktif")) {
    return setReply("Gunakan format: .setautosholat [aktif/nonaktif]");
  }

  const chatId = m.chat;
  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.autoSholat) global.db.data.others.autoSholat = {};

  if (text === "aktif") {
    global.db.data.others.autoSholat[chatId] = { status: true };
    return setReply("✅ Fitur autoSholat telah diaktifkan untuk grup ini.\nSilakan Tambahkan Waktu Jadwal Sholat Ddngan Ketik *.addnotifsholat* Jika Belum Mwngis Waktu Nya");
  }

  if (text === "nonaktif") {
    global.db.data.others.autoSholat[chatId] = { status: false };
    return setReply("❌ Fitur autoSholat telah dinonaktifkan untuk grup ini.");
  }
};

handler.tags = ["admin"];
handler.command = ["autosholat"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;