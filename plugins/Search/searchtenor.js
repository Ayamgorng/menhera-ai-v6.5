const fetch = require('node-fetch');

const handler = async (m, { hanz, setReply, args, command, prefix }) => {
    try {
       
        let query = args.join(' ');
        if (!query) {
            return setReply(`Example: ${prefix + command} funny cats`);
        }

        setReply('Please wait...');

        const apiKey = "AIzaSyAXrnIB3n--jca4qnYziuopLdMJJw7LKuI"; // Ganti dengan API key Anda
        let response = await fetch(
            `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${apiKey}&limit=5`
        );
        let data = await response.json();

   
        if (!data.results || data.results.length === 0) {
            return setReply('No results found for your query.');
        }

    
        for (let gif of data.results) {
            await hanz.sendMessage(
                m.chat,
                {
                    video: { url: gif.media_formats.gif.url },
                    caption: `GIF Result: ${query}`,
                    gifPlayback: true,
                },
                { quoted: m }
            );
        }
    } catch (err) {
        setReply('Terjadi kesalahan, silakan coba lagi!');
        console.error('Error:', err.message);
    }
};

handler.help = ['searchtenor'];
handler.tags = ['search'];
handler.command = /^(searchtenor|gifsearch)$/i;
handler.noCmdStore = true;
handler.onlyGroup = true; 
module.exports = handler;