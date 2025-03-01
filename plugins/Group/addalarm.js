
 let handler = async (m, { text, isAdmin, setReply }) => {
  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.setTimeAlarm) global.db.data.others.setTimeAlarm = [];
  if (!global.db.data.others.timeAlarm) global.db.data.others.timeAlarm = [];

  const args = text.split("|").map((v) => v.trim());
  if (args.length < 2) {
    return setReply("Format salah! Gunakan: .setalarm <jam>|<nama alarm>|[pesan]\nContoh: .setalarm 12:00|Ulang Tahun|Selamat ulang tahun!");
  }

  const time = args[0];
  const alarmName = args[1];
  const teks = args[2] || "Tidak ada pesan";
  const chatId = m.chat;
  const namaGc = m.groupName;

  // Validasi format waktu
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time)) {
    return setReply("Format waktu salah! Gunakan format HH:mm (contoh: 12:00).");
  }

  
  const existingAlarm = global.db.data.others.setTimeAlarm.find(
    (alarm) => alarm.chatId === chatId && alarm.alarmName === alarmName
  );
  if (existingAlarm) {
    existingAlarm.time = time;
    existingAlarm.teks = teks;
    existingAlarm.namaGc = namaGc;
    setReply(`Alarm "${alarmName}" untuk grup *${namaGc}* diperbarui ke waktu ${time} dengan pesan: "${teks}".`);
  } else {
    global.db.data.others.setTimeAlarm.push({ namaGc, chatId, time, teks, alarmName });
    setReply(`Alarm "${alarmName}" berhasil disetel untuk grup *${namaGc}* pada waktu ${time} dengan pesan: "${teks}".`);
  }

  
  if (!global.db.data.others.timeAlarm.includes(chatId)) {
    global.db.data.others.timeAlarm.push(chatId);
  }
};

handler.tags = ["admin"];
handler.command = ["setalarm","addalarm"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;   