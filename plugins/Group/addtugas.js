const fs = require("fs");
const path = require("path");


const tugasFilePath = "./database/tugas.json";
const mediaFolder = "./database/tugas_media";


function loadDataTugas() {
  return fs.existsSync(tugasFilePath) ? JSON.parse(fs.readFileSync(tugasFilePath)) : [];
}


function saveDataTugas(data) {
  fs.writeFileSync(tugasFilePath, JSON.stringify(data, null, 2));
}



let handler = async (m, { text, setReply }) => {
  let dataTugas = loadDataTugas(); 

  const quoted = m.quoted ? m.quoted : m;
  const mime = (quoted.msg || quoted).mimetype || "";

 
  const args = text.split("|").map((v) => v.trim());
  if (args.length < 3) {
    return setReply(
      "❌ Format salah! Gunakan:\n.addtugas <jam>|<nama tugas>|<pesan>\n" +
      "Contoh:\n.addtugas 12:00|Belajar Matematika|Kerjakan soal halaman 10.\n"+
     "Jika Tugas Menyertakan Media Silakn Reply Media Nya Lalu Masukan Teks Tugas Nya"
    );
  }

  const time = args[0]; 
  const taskName = args[1]; 
  const taskMessage = args[2]; 
  const chatId = m.chat; 
  const groupName = m.groupName || "Grup"; 

  
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(time)) {
    return setReply("❌ Format waktu salah! Gunakan format HH:mm (contoh: 12:00).");
  }

 
  let mediaFilePath = null;
  if (quoted && mime) {
    const mediaBuffer = await quoted.download();
    const extension = mime.split("/")[1];
    mediaFilePath = path.join(mediaFolder, `${taskName}.${extension}`);
    fs.writeFileSync(mediaFilePath, mediaBuffer);
  }

 
  dataTugas.push({
    chatId,
    groupName,
    time,
    taskName,
    message: taskMessage,
    media: mediaFilePath ? `${mediaFolder}/${taskName}.${mime.split("/")[1]}` : null,
  });

  
  saveDataTugas(dataTugas);

  setReply(
    `✅ Tugas "${taskName}" berhasil ditambahkan di grup *${groupName}* pada waktu ${time} dengan pesan: "${taskMessage}".`
  );
};

handler.tags = ["admin"];
handler.command = ["addtugas"];
handler.onlyGroup = true;

module.exports = handler;