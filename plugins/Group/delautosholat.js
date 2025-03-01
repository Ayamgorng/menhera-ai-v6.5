let handler = async (m, { setReply }) => {
  const chatId = m.chat;

  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.autoSholat) global.db.data.others.autoSholat = {};

  if (!global.db.data.others.autoSholat[chatId]) {
    return setReply("❌ Tidak ada pengaturan autoSholat untuk grup ini.");
  }

 
  delete global.db.data.others.autoSholat[chatId];

  setReply("✅ Pengaturan autoSholat untuk grup ini telah dihapus.");
};

handler.tags = ["admin"];
handler.command = ["delautosholat"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;