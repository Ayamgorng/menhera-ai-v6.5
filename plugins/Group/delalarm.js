let handler = async (m, { text, isAdmin, setReply }) => {
  

  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.setTimeAlarm) global.db.data.others.setTimeAlarm = [];

  const setTimeAlarm = global.db.data.others.setTimeAlarm;
  const chatId = m.chat; 
  const index = setTimeAlarm.findIndex(alarm => alarm.chatId === chatId);

  if (index === -1) {
    return setReply(`⚠️ Tidak ada alarm yang disetel untuk grup ini.`);
  }

 
  const deletedAlarm = setTimeAlarm.splice(index, 1)[0];

  setReply(`✅ Alarm dengan nama *"${deletedAlarm.alarmName}"* berhasil dihapus dari grup ini.`);
};

handler.tags = ["admin"];
handler.command = ["delalarm"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;