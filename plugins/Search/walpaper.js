
const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { q, prefix, setReply, hanz }) => {
    if (!q) return m.reply(`❓ Mau nyari wallpaper apa? Contoh penggunaan:\n${prefix}wallpaper One Piece`);

    const title = q; 
    try {
        const results = await wallpaper(title); 
        if (!results || results.length === 0) return m.reply('Tidak ditemukan wallpaper untuk kata kunci tersebut.');

        let response = `📸 Hasil pencarian untuk: ${title}\n\n`;
        results.forEach((result, index) => {
            response += `🖼️ ${index + 1}. **${result.title}**\n`;
            response += `📝 Tipe: ${result.type}\n`;
            response += `🔗 Sumber: ${result.source}\n`;
            if (result.image && result.image.length > 0) {
                response += `![Image](${result.image[0]})\n\n`;
            } else {
                response += `📷 Gambar tidak tersedia\n\n`;
            }
        });

        await m.reply(response);
    } catch (error) {
        console.error(error);
        m.reply('❌ Terjadi kesalahan saat mencari wallpaper. Coba lagi nanti.');
    }
};

handler.help = ["wallpaper"];
handler.tags = ["search"];
handler.command = ["wallpaper", "walpaper"]; // Alias command

module.exports = handler;

async function wallpaper(title, page = '1') {
    try {
        const { data } = await axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`);
        let $ = cheerio.load(data);
        let hasil = [];

        $('div.grid-item').each(function (a, b) {
            hasil.push({
                title: $(b).find('div.info > a > h3').text(),
                type: $(b).find('div.info > a:nth-child(2)').text(),
                source: 'https://www.besthdwallpaper.com/' + $(b).find('div > a:nth-child(3)').attr('href'),
                image: [
                    $(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'),
                    $(b).find('picture > source:nth-child(1)').attr('srcset'),
                    $(b).find('picture > source:nth-child(2)').attr('srcset')
                ]
            });
        });

        return hasil;
    } catch (error) {
        throw new Error('Failed to fetch data from the wallpaper site.');
    }
}
