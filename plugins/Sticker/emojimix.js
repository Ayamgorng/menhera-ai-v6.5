const fetch = require('node-fetch');


const handler = async (m, { hanz, setReply, args, command, prefix }) => {
    try {
     
        let [emoji1, emoji2] = args.join(' ').split`+`;
        if (!emoji1 || !emoji2) {
            return setReply(`Example: ${prefix + command} 😅+🤔`);
        }

        setReply('Please wait...'); 
        let response = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAXrnIB3n--jca4qnYziuopLdMJJw7LKuI&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`);
        let anu2 = await response.json();

       
        for (let res of anu2.results) {
            await hanz.sendImageAsStickerThumb(m.chat, res.url, m);
        }

    } catch (err) {
       
        setReply('Terjadi kesalahan, silakan coba lagi!');
        console.error('Error:', err.message);
    }
};


handler.help = ['emojimix'];
handler.tags = ['sticker'];
handler.command = /^(emojimix)$/i;
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
