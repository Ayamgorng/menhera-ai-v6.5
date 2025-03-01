const axios = require("axios");
const cheerio = require('cheerio');

let handler = async (m, { q, prefix,setReply}) => {
    if (!q) return m.reply(`❓ *Teks Alkitab tidak ditemukan!*\n\n📖 *Contoh penggunaan:*\n*.alkitab kejadian*`);

    m.reply('🙏 *Mencari ayat yang diminta... Mohon tunggu sebentar*');
    
    try {
        let res = await axios.get(`https://alkitab.me/search?q=${encodeURIComponent(q)}`, { 
            headers: { 
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36" 
            } 
        });

        let $ = cheerio.load(res.data);
        let result = [];
        
        $('div.vw').each(function (a, b) {
            let teks = $(b).find('p').text().trim();
            let link = $(b).find('a').attr('href');
            let title = $(b).find('a').text().trim();
            result.push({ teks, link, title });
        });

        if (result.length === 0) {
            return m.reply('❌ *Ayat tidak ditemukan! Coba periksa kata kunci pencarian Anda*');
        }
        let caption = result.map(v => `📖 *${v.title}*\n${v.teks}\n🔗 ${v.link}`).join('\n────────\n');
        setReply(`🔍 *Hasil Pencarian Alkitab:*\n\n${caption}`);
    } catch (error) {
        m.reply('❌ *Terjadi kesalahan saat mencari ayat Alkitab, coba lagi nanti.*');
    }
};

handler.help = ["alkitab"];
handler.tags = ["islamic"];
handler.command = ["alkitab"];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
