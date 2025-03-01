let handler = async (m, { setReply }) => {
  const setTimeAlarm = global.db.data.others.setTimeAlarm || [];

  if (setTimeAlarm.length === 0) {
    return setReply("Tidak ada alarm yang disetel saat ini.");
  }

  const list = setTimeAlarm
    .map((alarm, index) => {
      return `*${index + 1}.* Nama Grup: ${alarm.namaGc}\n📂 ID Grup: ${alarm.chatId}\n⏰ Waktu: ${alarm.time}\n🔔 Nama Alarm: ${alarm.alarmName}\n📢 Pesan: ${alarm.teks}`;
    })
    .join("\n\n");

  setReply(`Daftar Alarm yang Disetel:\n\n${list}`);
};

handler.tags = ["info"];
handler.command = ["listalarm"];
handler.group = false;
handler.admin = false;

module.exports = handler;