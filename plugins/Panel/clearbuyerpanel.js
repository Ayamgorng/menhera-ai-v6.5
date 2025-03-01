const fs = require('fs');

let handler = async (m, { setReply }) => {
    const path = './database/datapanel.json';

   
    if (!fs.existsSync(path)) {
        return setReply("❌ *File data panel tidak ditemukan.*");
    }

    let dataBuyPanel;
    try {
       
        dataBuyPanel = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (error) {
        return setReply("❌ *Terjadi kesalahan saat membaca file data panel.*\nPastikan file JSON ada dan formatnya benar.");
    }

   
    if (!dataBuyPanel || dataBuyPanel.length === 0) {
        return setReply("📂 *Tidak ada data pembeli untuk dihapus.*");
    }

    
    try {
        fs.writeFileSync(path, JSON.stringify([], null, 2));
    } catch (error) {
        return setReply("❌ *Terjadi kesalahan saat menghapus data panel.*");
    }

  
    setReply(`✅ *Semua data pembeli berhasil dihapus!*\nJumlah data yang dihapus: ${dataBuyPanel.length}`);
};

handler.help = ["clearbuyerpanel"];
handler.tags = ["panel"];
handler.command = /^(clearbuyerpanel)$/i;
handler.owner = true;

module.exports = handler;