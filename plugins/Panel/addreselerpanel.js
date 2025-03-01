const fs = require('fs');
const moment = require("moment-timezone");
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')




let handler = async (m, { hanz, text, args, setReply }) => {
   
    let targetNumber;

   let ucapanWaktu;
if (timeWib < "06:00:00") {
    ucapanWaktu = '🌅 Selamat pagi!';
} else if (timeWib < "11:00:00") {
    ucapanWaktu = '☀️ Selamat pagi!';
} else if (timeWib < "15:00:00") {
    ucapanWaktu = '🌞 Selamat siang!';
} else if (timeWib < "18:00:00") {
    ucapanWaktu = '🌇 Selamat sore!';
} else if (timeWib < "19:00:00") {
    ucapanWaktu = '🌙 Selamat malam!';
} else {
    ucapanWaktu = '🌌 Selamat malam!';
}
    if (args[0]) {
        targetNumber = args[0].replace(/[^0-9]/g, "");  // Ambil nomor dari input dan bersihkan dari karakter non-digit
    } else if (m.quoted) {
        // Jika tidak ada input manual, cek apakah ada pesan yang di-reply
        const quotedMessageSender = m.quoted.sender;  // Mengambil pengirim dari pesan yang di-reply
        targetNumber = quotedMessageSender.split("@")[0];  // Memisahkan nomor dari identifier WA
    } else {
        // Jika tidak ada input manual atau reply pesan
        return setReply("Masukkan nomor target (contoh: 62xx) atau reply pesan dari target.");
    }

    // Cek apakah nomor valid di WhatsApp
    let cek1 = await hanz.onWhatsApp(targetNumber + "@s.whatsapp.net");
    if (cek1.length === 0) return setReply(`Masukkan nomor yang valid dan terdaftar di WhatsApp!!!`);

    // Cek apakah nomor sudah ada dalam daftar reseller panel
    const userResPanel = JSON.parse(fs.readFileSync("./database/reselerpanel.json"));  
const isResPanel = userResPanel.includes(m.sender.replace('@s.whatsapp.net', ''));
    if (userResPanel.includes(targetNumber)) {
        return setReply(`Nomor ${targetNumber} sudah terdaftar sebagai Reseller Panel!`);
    }

    // Tambahkan nomor ke dalam daftar reseller panel
    userResPanel.push(targetNumber);
    fs.writeFileSync("./database/reselerpanel.json", JSON.stringify(userResPanel)); // Simpan daftar yang diperbarui

    // Kirim pesan konfirmasi kepada pemilik baru
    setReply(`Sukses! Sekarang ${targetNumber} adalah Reseller Panel!`);

    // Kirim pesan selamat kepada reseller yang baru
    await hanz.sendMessage(targetNumber + "@s.whatsapp.net", {
        image: {
            url: `https://raw.githubusercontent.com/Rangelofficial/Uploade-db/main/uploader/1735950753706.jpg`
        },
        caption: `Hallo ${ucapanWaktu} ${targetNumber}!\n\nSelamat! Kamu sekarang adalah Reseller Panel. \n\nJangan ragu untuk menghubungi kami jika ada pertanyaan atau bantuan yang dibutuhkan.`
    }, {
        quoted: m
    });
};

handler.help = ['addreselerpanel'];
handler.tags = ['admin'];
handler.command = /^(addreselerpanel)$/i;
handler.owner = true;  // Hanya pemilik bot yang bisa akses fitur ini

module.exports = handler;

