const fs = require("fs");
const path = require("path");


const tugasFilePath = "./database/tugas.json";


function loadDataTugas() {
  return fs.existsSync(tugasFilePath) ? JSON.parse(fs.readFileSync(tugasFilePath)) : [];
}

let handler = async (m, { setReply }) => {
  const dataTugas = loadDataTugas(); 
  const chatId = m.chat; 
  const groupTasks = dataTugas.filter(task => task.chatId === chatId);

  if (!groupTasks || groupTasks.length === 0) {
    return setReply("❌ Tidak ada tugas yang tersimpan untuk grup ini.");
  }

 
  let list = "📋 *Daftar Tugas*\n\n";
  groupTasks.forEach((task, index) => {
    list += `${index + 1}. Nama: *${task.taskName}*\n`;
    list += `   Jam: ${task.time}\n`;
    list += `   Pesan: ${task.message}\n`;
    list += `   Media: ${task.media ? "✅ Ada" : "❌ Tidak ada"}\n\n`;
  });

  setReply(list.trim());
};

handler.tags = ["admin"];
handler.command = ["listtugas"];
handler.group = true;

module.exports = handler;