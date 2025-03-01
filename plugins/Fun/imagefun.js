const fs = require('fs');

let handler = async (m, { command, hanz,setReply}) => {
                        

    // Menentukan path file JSON berdasarkan perintah
    const paths = {
        chinese: './json/tiktokpics/china.json',
        hijab: './json/tiktokpics/hijab.json',
        indo: './json/tiktokpics/indonesia.json',
        japanese: './json/tiktokpics/japan.json',
        korean: './json/tiktokpics/korea.json',
        malay: './json/tiktokpics/malaysia.json',
        randomgirl: './json/tiktokpics/random.json',
        randomboy: './json/tiktokpics/random2.json',
        thai: './json/tiktokpics/thailand.json',
        vietnamese: './json/tiktokpics/vietnam.json'
    };

    // Jika perintah tidak ada di dalam daftar paths, kirim pesan error
    if (!paths[command]) return m.reply("Perintah tidak ditemukan.");

    try {
        // Menunggu pesan respon
        setReply("Tunggu sebentar...");

        // Membaca file JSON dan memilih gambar secara acak
        const data = JSON.parse(fs.readFileSync(paths[command]));
        const hasil = data[Math.floor(Math.random() * data.length)]; // Pilih gambar secara acak

        // Mengirim gambar yang dipilih
        await hanz.sendMessage(m.chat, { caption: "Sukses!", image: { url: hasil.url } }, { quoted: m });

    } catch (error) {
        console.error("Error saat mengambil gambar:", error);
        m.reply("Terjadi kesalahan saat mengambil gambar. Coba lagi nanti.");
    }
};

handler.command = [
    'chinese', 'hijab', 'indo', 'japanese', 'korean', 
    'malay', 'randomgirl', 'randomboy', 'thai', 'vietnamese'
];
handler.tags = ['fun'];
handler.help = [
    'chinese', 'hijab', 'indo', 'japanese', 'korean', 
    'malay', 'randomgirl', 'randomboy', 'thai', 'vietnamese'
];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["image"]
module.exports = handler;
