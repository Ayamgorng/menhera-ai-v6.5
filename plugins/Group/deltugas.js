const fs = require("fs");

const tugasFilePath = "./database/tugas.json";

function loadDataTugas() {
  return fs.existsSync(tugasFilePath) ? JSON.parse(fs.readFileSync(tugasFilePath)) : [];
}

function saveDataTugas(data) {
  fs.writeFileSync(tugasFilePath, JSON.stringify(data, null, 2));
}

let handler = async (m, { text, setReply }) => {
  const groupId = m.chat; 
  let dataTugas = loadDataTugas();

  
  const tugasGrup = dataTugas.filter((tugas) => tugas.chatId === groupId);

  if (tugasGrup.length === 0) {
    return setReply("❌ Tidak ada tugas untuk grup ini.");
  }

  if (!text || isNaN(text)) {
    return setReply("❌ Format salah! Gunakan:\n.deltugas <nomor_tugas>");
  }

  const taskIndex = parseInt(text) - 1; 
  if (taskIndex < 0 || taskIndex >= tugasGrup.length) {
    return setReply("❌ Nomor tugas tidak ditemukan untuk grup ini.");
  }


  const deletedTask = tugasGrup[taskIndex];

  
  dataTugas = dataTugas.filter((tugas) => !(tugas.chatId === groupId && tugas === deletedTask));

  
  if (deletedTask.media) {
    try {
      fs.unlinkSync(deletedTask.media);
    } catch (err) {
      console.error("Gagal menghapus media:", err);
    }
  }

  
  saveDataTugas(dataTugas);

  setReply(`✅ Tugas "${deletedTask.taskName}" berhasil dihapus beserta media terkaitnya.`);
};

handler.tags = ["admin"];
handler.command = ["deltugas"];
handler.onlyGroup = true;

module.exports = handler;
    

