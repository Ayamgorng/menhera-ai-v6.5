const fetch = require('node-fetch');

let handler = async (m, { text }) => {
    if (!text) return m.reply('Masukkan link yang ingin dipendekkan.');

    async function shorturl(url) {
        try {
            const headers = {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.125 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://www.shorturl.at',
                'Referer': 'https://www.shorturl.at/',
                'Accept-Language': 'en-US,en;q=0.9'
            };

            const response = await fetch("https://www.shorturl.at/shortener.php", {
                method: 'POST',
                headers: headers,
                body: new URLSearchParams({ u: url })
            });

            const responseBody = await response.text();
            const shortenedUrl = responseBody.split('id="shortenurl" type="text" value="')[1]?.split('"')[0];
            
            return shortenedUrl || 'Gagal mendapatkan URL pendek';
        } catch (error) {
            console.error(error);
            return 'Terjadi kesalahan saat mempersingkat URL';
        }
    }

    let shortenedUrl = await shorturl(text);
    m.reply(`URL pendek: ${shortenedUrl}`);
};

handler.help = ['shorturl <url>'];
handler.tags = ['shorturl'];
handler.command = /^shorturl$/i;
handler.limit = false;

module.exports = handler;
