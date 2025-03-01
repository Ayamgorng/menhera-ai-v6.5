const axios = require('axios');

const handler = async (m, { hanz, command, prefix, q,sendSticker}) => {
    // Check if the URL is provided
    if (!q) {
       return m.reply(`Awali *URL* dengan http:// atau https://`);
    }

    try {
        // Make a GET request to the provided URL with custom headers
        const gt = await axios.get(q, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Referer": "https://www.google.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            },
            responseType: 'arraybuffer'
        });

        const contentType = gt.headers['content-type'];
        console.log(`Content-Type: ${contentType}`);

        // Handle different content types
        if (/json/i.test(contentType)) {
            const jsonData = JSON.parse(Buffer.from(gt.data, 'binary').toString('utf8'));
            return hanz.editmsg(m.chat, JSON.stringify(jsonData, null, 2), m);
        } else if (/text/i.test(contentType)) {
            const textData = Buffer.from(gt.data, 'binary').toString('utf8');
            return m.reply( textData);
        } else if (q.includes('webp')) {
            return sendSticker(q)
        } else if (/image/i.test(contentType)) {
            return hanz.sendMessage(m.chat, { image: { url: q } }, { quoted: m });
        } else if (/video/i.test(contentType)) {
            return hanz.sendMessage(m.chat, { video: { url: q } }, { quoted: m });
        } else if (/audio/i.test(contentType) || q.includes(".mp3")) {
            return hanz.sendMessage(m.chat, { audio: { url: q } }, { quoted: m });
        } else if (/application\/zip/i.test(contentType) || /application\/x-zip-compressed/i.test(contentType)) {
            return hanz.sendFile(m.chat, q, '', q, m);
        } else if (/application\/pdf/i.test(contentType)) {
            return hanz.sendFile(m.chat, q, '', q, m);
        } else {
            return m.reply(`MIME: ${contentType}\n\n${gt.data}`);
        }
    } catch (error) {
        console.error(`Terjadi kesalahan: ${error}`);
        return m.reply( `Terjadi kesalahan saat mengakses URL: ${error.message}`);
    }
};

// Command setup
handler.help = ['get'];
handler.tags = ['tools'];
handler.command = /^get$/i;  // Define the command trigger for the plugin

module.exports = handler;
