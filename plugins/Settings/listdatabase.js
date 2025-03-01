let handler = async (m, { setReply }) => {
  try {
   
    const dbData = global.db.data;
    let message = `*Total Isi Database:*\n\n`;
    for (let key in dbData) {
      let value = dbData[key];
      let total;
      if (Array.isArray(value)) {
        total = value.length;
      } else if (typeof value === "object" && value !== null) {
        total = Object.keys(value).length;
      } else {
        total = 0;
      }

      message += `- ${key}: ${total}\n`;
    }
    setReply(message);
  } catch (error) {
    setReply("Terjadi kesalahan saat memproses database.");
    console.error(error); 
  }
};

handler.help = ['listdatabase'];
handler.tags = ['settings'];
handler.command = ['listdatabase'];
handler.owner = true;

module.exports = handler;