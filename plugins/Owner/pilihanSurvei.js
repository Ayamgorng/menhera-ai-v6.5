const fs = require('fs-extra');

let handler = async (m, { command, setReply }) => {
  const text = command === "ya" ? "ya" : command === "tidak" ? "tidak" : null;

  if (!text) {
    return setReply("Mohon pilih antara 'ya' atau 'tidak'.");
  }

  const filePath = './database/dataSurvei.json';
  let dataSurvei = [];
  if (fs.existsSync(filePath)) {
    dataSurvei = fs.readJsonSync(filePath);
  }

  const existingEntry = dataSurvei.find(entry => entry.id === m.sender);
  if (existingEntry) {
    return setReply(`Anda sudah memilih sebelumnya dengan jawaban: ${existingEntry.choice}`);
  }

  const newEntry = {
    name: m.pushName || "Unknown",
    id: m.sender,
    choice: text,
    timestamp: new Date().toISOString()
  };

  dataSurvei.push(newEntry);

  fs.writeJsonSync(filePath, dataSurvei, { spaces: 2 });

  setReply(
    `${m.pushName} Memilih ${text}\nID : ${m.sender}\nHasil survei akan kami simpan di database dan akan diumumkan untuk hasilnya.`
  );
};

handler.tags = ["admin"];
handler.command = ["ya", "tidak"];

module.exports = handler;