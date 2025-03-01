let handler = async (m, { text, isAdmin, setReply }) => {
  if (!isAdmin) return setReply("Perintah ini hanya dapat digunakan oleh admin grup.");


  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.setTime) global.db.data.others.setTime = {};

  const args = text.split("|").map((v) => v.trim());

  if (args.length < 2) {
    return setReply("Format salah! Gunakan: .setclose <waktu>|<alasan>\nContoh: .setclose 22:00|Menutup grup untuk istirahat malam.");
  }

  const time = args[0];
  const reason = args[1];
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(time)) {
    return setReply("Format waktu salah! Gunakan format HH:mm (contoh: .setclose 22:00).");
  }

  const chatId = m.chat;
  const groupName = m.groupName;


  global.db.data.others.setTime[chatId] = {
    groupName,
    timeClose: time,
    reasonClose: reason, 
    timeOpen: global.db.data.others.setTime[chatId]?.timeOpen || null,
  };

  setReply(`✅ Waktu tutup grup *${groupName}* disetel pada *${time}* dengan alasan: "${reason}". Grup akan ditutup secara otomatis pada waktu yang dijadwalkan.`);
};

handler.tags = ["admin"];
handler.command = ["setclose"];
handler.group = true;
handler.admin = true;

module.exports = handler;