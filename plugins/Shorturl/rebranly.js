// From tanaka sen

const fetch = require('node-fetch');

let handler = async (m, { text }) => {
    if (!text) return m.reply('Masukkan link yang ingin dipendekkan.');

    
 async function rebrandly(url) {
        try {
            const encoded = encodeURIComponent(url);
            const response = await fetch(`https://api.rebrandly.com/v1/links/new?destination=${encoded}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    apikey: "c95033066865402eb6d1dc40a4c4547f",
                    Host: "api.rebrandly.com",
                },
            });
            const result = await response.json();
            return result.shortUrl;
        } catch (error) {
            console.error(error);
            return null;
        }
    }




    let shortUrl = await rebrandly(text); 
    if (shortUrl) {
        m.reply(`URL pendek: ${shortUrl}`); 
    } else {
        m.reply('Terjadi kesalahan saat mempersingkat URL.'); 
    }
};

handler.help = ['rebrandly <url>'];
handler.tags = ['shorturl'];
handler.command = /^rebrandly$/i;
handler.limit = false;

module.exports = handler;
