const fs = require('fs');

let handler = async (m, { hanz, text, args,  setReply }) => {
    
    let targetNumber;

    // Cek apakah ada input nomor manual atau pesan yang di-reply
    if (args[0]) {
        targetNumber = args[0].replace(/[^0-9]/g, "");  // Ambil nomor dari input dan bersihkan dari karakter non-digit
    } else if (m.quoted) {
        // Jika tidak ada input manual, cek apakah ada pesan yang di-reply
        const quotedMessageSender = m.quoted.sender;  // Mengambil pengirim dari pesan yang di-reply
        targetNumber = quotedMessageSender.split("@")[0];  // Memisahkan nomor dari identifier WA
    } else {
        // Jika tidak ada input manual atau reply pesan
        return setReply("Masukkan nomor target (contoh: 62xx) atau reply pesan dari target yang ingin dihapus.");
    }

    // Cek apakah nomor ada dalam daftar reseller
    let userResPanel = JSON.parse(fs.readFileSync("./database/reselerpanel.json"));
    const unp = userResPanel.indexOf(targetNumber);
    if (unp === -1) return setReply(`Nomor ${targetNumber} tidak ditemukan dalam daftar reseller.`);

    // Hapus nomor dari daftar reseller panel
    userResPanel.splice(unp, 1);
    fs.writeFileSync("./database/reselerpanel.json", JSON.stringify(userResPanel)); // Simpan daftar yang diperbarui

    // Kirim pesan konfirmasi kepada pengguna yang dihapus
    setReply(`✅ Sukses! Nomor ${targetNumber} berhasil dihapus dari Reseller Panel.`);
};

handler.help = ['delreselerpanel'];
handler.tags = ['admin'];
handler.command = /^(delreselerpanel)$/i;
handler.owner = true;  // Hanya pemilik bot yang bisa akses fitur ini

module.exports = handler;
