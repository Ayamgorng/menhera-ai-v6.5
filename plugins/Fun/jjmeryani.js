const fetch = require('node-fetch');

let handler = async (m, { hanz,setReply,sendReact }) => {
    try {
 setReply(mess.wait)       
        let kaydt = await fetch('https://raw.githubusercontent.com/KirBotz/nyenyee/master/meryani.json').then(res => res.json());

        // Memilih video acak dari data
        let hayu = kaydt[Math.floor(Math.random() * kaydt.length)];

        // Mengirim pesan dengan video acak
        await hanz.sendMessage(m.chat, { video: { url: hayu }, caption: `Nih kak🗿` }, { quoted: m });
    } catch (error) {
        console.error("Error fetching video:", error);
        sendReact('❌')
    }
};

handler.command = ['jjmeryani']; 
handler.tags = ['fun']; // Kategori fitur
handler.help = ['randomvideo']; 
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["kumpulan jj meryani"]
module.exports = handler;
