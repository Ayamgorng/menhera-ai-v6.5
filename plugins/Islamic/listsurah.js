const { listsurah } = require('../../lib/scraper');  

let handler = async (m, { prefix, command }) => {
    if (command === 'listsurah') {
        try {
            m.reply('🔍 *Sedang memuat daftar surah... Mohon tunggu sebentar*');

      
            let res = await listsurah();
            let teks = `📜 *Berikut adalah daftar surah yang tersedia:*\n\n`;
            let pre = 1;

        
            for (let i of res) {
                teks += `*𖦹 No :* ${pre++}\n`;  
                teks += `*📖 Nama Surah:* ${i.name_surah}\n`; 
                teks += `*🔗 Link:* ${i.link}\n\n`;  
            }

            m.reply(teks);
        } catch (e) {
            console.error(e); 
            m.reply('❌ *Gagal memuat daftar surah. Silakan coba lagi nanti.*');
        }
    }
};

handler.help = ["listsurah"];  
handler.tags = ["islamic"];  
handler.command = ["listsurah"];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;