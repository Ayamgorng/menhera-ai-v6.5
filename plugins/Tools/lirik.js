const fetch = require('node-fetch');

const handler = async (m, { text, hanz, usedPrefix, command }) => {
    if (!text) throw 'Masukkan lirik atau judulnya';
    m.reply(mess.wait)


    try {
        const response = await fetch(`https://api.nyxs.pw/tools/lirik?title=${encodeURIComponent(text)}`);
        
        if (!response.ok) throw new Error('Gagal menghubungi API');

        const data = await response.json();
        
        if (!data.result) throw new Error('Lirik tidak ditemukan');

        const bjir = data.result;
        let Lrk = `${gris1}${bjir}${gris1}`
        await m.reply(Lrk);
    } catch (e) {
        m.reply(`Error: ${e.message}`);
    }
};

handler.help = ['lirik', 'lyric'];
handler.command = ['lirik', 'lyric'];
handler.tags = ['tools'];

module.exports = handler;
