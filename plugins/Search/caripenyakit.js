const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { q }) => {
    if (!q) return m.reply(`Silakan masukkan nama penyakit yang ingin dicari, misalnya: *Gleneagles: Demam* 🩺`);

    const url = `https://www.gleneagles.com.sg/id/global-pages?search=${encodeURIComponent(q)}`;

    async function cariPenyakit() {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const results = [];

            $('.page-search-result').each((i, el) => {
                const title = $(el).find('p.result-page-title a').text().trim();
                const link = $(el).find('p.result-page-title a').attr('href');
                const tags = $(el).find('p.result-page-tags').text().trim();
                const content = $(el).find('p.result-page-content').text().trim();

                results.push(`*Judul:* ${title} 🩺\n*Pengertian:* ${content.slice(0, 100)}...\n*Tag:* ${tags} 🔍\n[👉 Lanjutkan Membaca](${link})\n`);
            });

            const formattedResults = results.join('\n') || "Tidak ada hasil ditemukan. ❌";
            m.reply(formattedResults);
        } catch (error) {
            console.error(error);
            m.reply(`Terjadi kesalahan: ${error.message} ⚠️`);
        }
    }

    await cariPenyakit(q);
};

handler.help = ["caripenyakit"];
handler.tags = ["search"];
handler.command = ["caripenyakit"]
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
