let handler = async (m, { conn, text, isAdmin, setReply }) => {
  const chatId = m.chat;


  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.setTime) global.db.data.others.setTime = {};
  if (!global.db.data.others.timeAlarm) global.db.data.others.timeAlarm = [];

  const setTime = global.db.data.others.setTime;
  const timeAlarm = global.db.data.others.timeAlarm;

  
  if (!setTime[chatId]) {
    return setReply("Tidak ada jadwal open/close yang diatur untuk grup ini.");
  }

 
  delete setTime[chatId];

 
  global.db.data.others.timeAlarm = timeAlarm.filter(alarm => alarm.chatId !== chatId);

  setReply(`✅ Jadwal open/close dan alarm untuk grup ini berhasil dihapus.`);
};

handler.tags = ["admin"];
handler.command = ["deltime"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;