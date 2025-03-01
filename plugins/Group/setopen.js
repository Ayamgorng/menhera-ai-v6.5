let handler = async (m, { text, isAdmin, setReply }) => {
  
  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.setTime) global.db.data.others.setTime = {};

  const args = text.split("|").map((v) => v.trim());
  
  if (args.length < 2) {
    return setReply("Format salah! Gunakan: .setopen <waktu>|<alasan>\nContoh: .setopen 08:00|Membuka grup untuk diskusi.");
  }

  const time = args[0]; 
  const reason = args[1]; 
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(time)) {
    return setReply("Format waktu salah! Gunakan format HH:mm (contoh: .setopen 08:00).");
  }

  const chatId = m.chat;
  const groupName = m.groupName; 

  
  global.db.data.others.setTime[chatId] = {
    groupName, 
    timeOpen: time,
    reasonOpen: reason,
    timeClose: global.db.data.others.setTime[chatId]?.timeClose || null,
  };

  setReply(`✅ Waktu buka grup *${groupName}* disetel pada *${time}* dengan alasan: "${reason}". Grup akan dibuka secara otomatis pada waktu yang dijadwalkan.`);
};

handler.tags = ["admin"];
handler.command = ["setopen"];
handler.group = true;
handler.admin = true;

module.exports = handler;