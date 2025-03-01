const { surah,selectSurah } = require('../../lib/scraper');  // Mengimpor fungsi 'surah' dari 'scraper'

let handler = async (m, { q, prefix, command, setReply }) => {
    try {
        if (!q) return setReply(`❓ *Mau cari surah apa?*\n\n📖 *Contoh penggunaan:*\n*${prefix + command} Al-Baqarah*`);
        
        setReply('🔍 *Sedang mencari surah yang diminta... Mohon tunggu sebentar*');
        
        let hasil = q.replace(" ", "-");
        let res = await surah(hasil);

        console.log("Hasil dari fungsi surah:", res); 

        if (!res || !res.ayat || res.ayat.length === 0) 
            return setReply(`❌ *Surah tidak ditemukan! Periksa kembali nama surah yang Anda masukkan.*`);

        let teks = `📖 *Surah ${res.surahName}*\n\n${res.bismillah ? res.bismillah : ''}\n`;
        
        let pre = 1;
        for (let i of res.ayat) {
            teks += `*𖦹 Ayat :* ${pre++}\n`;
            teks += `🔹 ${i.arab}\n`;  
            teks += `🔸 *Bacaan:* ${i.latin}\n`; 
            teks += `📖 *Arti:* ${i.translate}\n\n`; 
        }

        setReply(teks);
    } catch (e) {
        console.error("Error:", e);  
        m.reply('❌ *Terjadi kesalahan atau surah tidak ditemukan. Silakan coba lagi atau periksa nama surah yang dimasukkan dengan ketik *.listsurah*');
    }
};

handler.help = ["surah"];
handler.tags = ["islamic"];
handler.command = ["surah"];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
