const fs = require('fs-extra');

let handler = async (m, { setReply }) => {
 
  const filePath = './database/dataSurvei.json';
  if (!fs.existsSync(filePath)) {
    return setReply("Belum ada data survei yang tersimpan.");
  }

  const dataSurvei = fs.readJsonSync(filePath);
  if (dataSurvei.length === 0) {
    return setReply("Belum ada data survei yang tersimpan.");
  }
  let listSurvei = `*📊 Hasil Survei:*\n\n`;
  dataSurvei.forEach((entry, index) => {
    listSurvei += `*${index + 1}.* ${entry.name} (${entry.id})\n   ➡️ Pilihan: ${entry.choice}\n   🕒 Waktu: ${entry.timestamp}\n\n`;
  });
  setReply(listSurvei);
};

handler.tags = ["admin"];
handler.command = ["listsurvei"];

module.exports = handler;