const fs = require('fs');

let handler = async (m, { setReply }) => {
  
    const dbPath = './database/aihome.json';
    if (!fs.existsSync(dbPath)) {
        setReply("Database aihome.json tidak ditemukan. Pastikan Anda sudah mengatur AI Home di setidaknya satu grup.");
        return;
    } 
    const aihomeData = JSON.parse(fs.readFileSync(dbPath, 'utf-8')); 
    if (aihomeData.length === 0) {
        setReply("Belum ada grup yang terdaftar di AI Home.");
        return;
    } 
    let listMessage = "*Daftar Grup AI Home:*\n\n";
    for (const group of aihomeData) {
        listMessage += `🌐 *Grup*: ${group.group}\n`;
        listMessage += `📂 *ID*: ${group.id}\n`;
        listMessage += `⚙️ *Status*: ${group.status ? "Aktif" : "Nonaktif"}\n`;
        listMessage += `📜 *Tipe*: ${group.type}\n`;
        listMessage += `✏️ *Prompt*: ${group.promptAi}\n`;
        listMessage += `----------------------------------\n`;
    }
    setReply(listMessage.trim());
};

handler.tags = ["admin"];
handler.command = ["listaihome","listaigroup"];
handler.onlyGroup = false; 
handler.owner = true; 

module.exports = handler;