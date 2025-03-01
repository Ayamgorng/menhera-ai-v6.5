let handler = async (m, { setReply }) => {
  const chatId = m.chat;
  const notifSholat = global.db.data.others?.notifSholat || {};

  let groupName = m.groupName
  const jadwalSholat = notifSholat[chatId];
  if (!jadwalSholat) {
    return setReply("❌ Jadwal sholat untuk grup ini belum diatur.");
  }

  // Menampilkan jadwal sholat yang telah disimpan
  const jadwalText = `
📅 *Jadwal Sholat untuk grup ${groupName} ini:*\n
- Shubuh: ${jadwalSholat.shubuh}
- Dzuhur: ${jadwalSholat.dzuhur}
- Ashar: ${jadwalSholat.ashar}
- Magrib: ${jadwalSholat.magrib}
- Isya: ${jadwalSholat.isya}
`;


  setReply(jadwalText);
};

handler.tags = ["admin"];
handler.command = ["listnotifsholat"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;