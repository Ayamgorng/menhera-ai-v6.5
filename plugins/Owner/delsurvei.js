const fs = require('fs-extra');

let handler = async (m, { setReply }) => {
  // Path file dataSurvei.json
  const filePath = './database/dataSurvei.json';

  // Cek apakah file dataSurvei.json ada
  if (!fs.existsSync(filePath)) {
    return setReply("Tidak ada data survei yang tersimpan untuk dihapus.");
  }

  // Membaca data survei dari file
  const dataSurvei = fs.readJsonSync(filePath);

  // Jika data kosong
  if (dataSurvei.length === 0) {
    return setReply("Tidak ada data survei yang tersimpan untuk dihapus.");
  }

  // Hapus file dataSurvei.json
  fs.writeJsonSync(filePath, []); // Mengosongkan file JSON

  setReply("✅ Semua data survei berhasil dihapus.");
};

handler.tags = ["admin"];
handler.command = ["delsurvei"];
handler.onlyGroup = true; // Hanya bisa digunakan di grup
handler.admin = true; // Hanya admin grup yang dapat menggunakan

module.exports = handler;