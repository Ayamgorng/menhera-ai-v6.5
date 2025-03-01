const { getSurah } = require('../../lib/scraper');  

let handler = async (m, { q, prefix, command, isGroup }) => {
  
 
    if (!q) {
        return m.reply(`Angka?\nContoh: ${prefix + command} 1\n\n*Note*: 1 = Al-Fatihah\n\nKetik ${prefix}listsurah untuk mengetahui nomor surah-surah lain`);
    }

    const surahIndex = parseInt(q);

   
    if (isNaN(surahIndex)) {
        return m.reply('❌ *Input tidak valid. Harap masukkan angka yang sesuai.*');
    }

    try {
     
        const res = await getSurah(surahIndex);

      
        m.reply(res);
    } catch (e) {
        console.error(e);  
        m.reply('❌ *Terjadi kesalahan saat mengambil surah. Silakan coba lagi nanti.*');
    }
};

handler.help = ["surah"]; 
handler.tags = ["islamic"]; 
handler.group = false
handler.command = ["getsurah"]; 
handler.noCmdStore = true  
handler.onlyGroup = true

module.exports = handler;