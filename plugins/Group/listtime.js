let handler = async (m, { setReply }) => {
  // Pastikan database `setTime` tersedia
  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.setTime) global.db.data.others.setTime = {};

  const setTime = global.db.data.others.setTime;
  const groupIds = Object.keys(setTime);

  if (groupIds.length === 0) {
    return setReply("🚫 Tidak ada grup yang memiliki jadwal open/close.");
  }

  let message = "📅 *Daftar Jadwal Open/Close Grup*\n\n";

  groupIds.forEach((chatId, index) => {
    const { groupName, timeOpen, timeClose } = setTime[chatId];
    message += `*${index + 1}. Grup:* ${groupName || "Tidak diketahui"}\n`;
    if (timeOpen) message += `   🕒 *Buka:* ${timeOpen}\n`;
    if (timeClose) message += `   🕒 *Tutup:* ${timeClose}\n`;
    message += `   📎 *ID Grup:* ${chatId}\n\n`;
  });

  setReply(message.trim());
};

handler.tags = ["admin"];
handler.command = ["listtime"];
handler.group = false;
handler.admin = false;

module.exports = handler;