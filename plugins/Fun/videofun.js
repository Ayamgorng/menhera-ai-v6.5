const fs = require('fs');

let handler = async (m, { command, hanz,setReply }) => {
    // Path file JSON berdasarkan perintah
    const paths = {
        tiktokghea: './json/tiktokvids/gheayubi.json',
        cosplayangel: './json/tiktokvids/cosplayangel.json',
        tiktokbocil: './json/tiktokvids/bocil.json',
        videosad: './json/tiktokvids/videosad.json',
        videowibu: './json/tiktokvids/wibuvid.json',
        tiktokkayes: './json/tiktokvids/kayes.json',
        tiktokpanrika: './json/tiktokvids/panrika.json',
        videogalau: './json/tiktokvids/galau.json'
    };

    // Jika perintah tidak ada di daftar paths, kirim pesan error
    if (!paths[command]) return m.reply("Perintah tidak ditemukan.");

    try {
        // Menunggu pesan respon
        setReply("Tunggu sebentar...");

        // Membaca file JSON dan memilih video secara acak
        const data = JSON.parse(fs.readFileSync(paths[command]));
        const hasil = data[Math.floor(Math.random() * data.length)]; // Pilih video secara acak

        // Menentukan caption khusus untuk beberapa perintah
        let caption = (command === 'cosplayangel')
            ? 'nih bang ehanz\nIngat jangan gamon yak\nAng3l udah pergi;)'
            : "Sukses!"; // Caption default untuk perintah lain

        // Mengirim video yang dipilih
        await hanz.sendMessage(m.chat, { caption, video: { url: hasil.url } }, { quoted: m });

    } catch (error) {
        console.error("Error saat mengambil video:", error);
        m.reply("Terjadi kesalahan saat mengambil video. Coba lagi nanti.");
    }
};

handler.command = [
    'tiktokghea', 'cosplayangel', 'tiktokbocil', 'videosad', 
    'videowibu', 'tiktokkayes', 'tiktokpanrika', 'videogalau'
];
handler.tags = ['fun'];
handler.help = [
    'tiktokghea', 'cosplayangel', 'tiktokbocil', 'videosad', 
    'wibuvid', 'tiktokkayes', 'tiktokpanrika', 'videogalau'
];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["video fun"]
module.exports = handler;
