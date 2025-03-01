/*const fs = require('fs');

let handler = async (m, { text, setReply }) => {
    const path = './database/datapanel.json';

    // Memastikan input berupa ID
    if (!text) {
        return setReply("❌ *Format salah!*\nPenggunaan:\n.delbuyerpanel [ID Pembeli]");
    }

    let dataBuyPanel;
    try {
        // Membaca file JSON
        dataBuyPanel = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (error) {
        return setReply("❌ *Terjadi kesalahan saat membaca file data panel.*\nPastikan file JSON ada dan formatnya benar.");
    }

    // Mengecek apakah ID yang diberikan ada di data
    const index = dataBuyPanel.findIndex((buyer) => buyer.ID === text.toUpperCase());
    if (index === -1) {
        return setReply(`⚠️ *ID Pembeli tidak ditemukan!*\nPastikan ID yang dimasukkan benar.`);
    }

    // Menghapus data pembeli dari array
    const removedBuyer = dataBuyPanel.splice(index, 1);

    try {
        // Menyimpan ulang data setelah penghapusan
        fs.writeFileSync(path, JSON.stringify(dataBuyPanel, null, 2));
    } catch (error) {
        return setReply("❌ *Terjadi kesalahan saat menyimpan perubahan data panel.*");
    }

    // Pesan sukses
    return setReply(`✅ *Pembeli berhasil dihapus!*\n\n🔑 *ID:* ${removedBuyer[0].ID}\n👤 *Nama:* ${removedBuyer[0].buyer_name}\n📞 *Nomor:* ${removedBuyer[0].number}`);
};

handler.help = ["delbuyerpanel [ID]"];
handler.tags = ["panel"];
handler.command = /^(delbuyerpanel)$/i;
handler.owner = true;

module.exports = handler;*/


const fs = require('fs');

let handler = async (m, { text, setReply }) => {
    const path = './database/datapanel.json';

    // Validasi input berupa nomor urutan
    if (!text || isNaN(text)) {
        return setReply("❌ *Format salah!*\nPenggunaan:\n.delbuyerpanel [Nomor Urutan]");
    }

    let dataBuyPanel;
    try {
        // Membaca file JSON
        dataBuyPanel = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (error) {
        return setReply("❌ *Terjadi kesalahan saat membaca file data panel.*\nPastikan file JSON ada dan formatnya benar.");
    }

   
    const index = parseInt(text) - 1; 
    if (index < 0 || index >= dataBuyPanel.length) {
        return setReply(`⚠️ *Nomor urutan tidak valid!*\nTotal pembeli saat ini: ${dataBuyPanel.length}`);
    }

   
    const removedBuyer = dataBuyPanel.splice(index, 1);

    try {
       
        fs.writeFileSync(path, JSON.stringify(dataBuyPanel, null, 2));
    } catch (error) {
        return setReply("❌ *Terjadi kesalahan saat menyimpan perubahan data panel.*");
    }

    // Pesan sukses
    return setReply(`✅ *Pembeli berhasil dihapus!*\n\n🔢 *Nomor Urutan:* ${text}\n👤 *Nama:* ${removedBuyer[0].buyer_name}\n📞 *Nomor:* ${removedBuyer[0].number}\n🔑 *ID:* ${removedBuyer[0].ID}`);
};

handler.help = ["delbuyerpanel [Nomor Urutan]"];
handler.tags = ["panel"];
handler.command = /^(delbuyerpanel)$/i;
handler.owner = true;

module.exports = handler;