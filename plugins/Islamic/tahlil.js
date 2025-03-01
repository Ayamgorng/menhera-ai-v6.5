const fetch = require("node-fetch");

let handler = async(m, { hanz, usedPrefix, command, text }) => {
    if (command == 'tahlil') {
       
        let res = await (await fetch('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/religion/tahlil.json')).json();

      
        let teks = `📿 *Doa Tahlil*\n\n_Silakan pilih doa tahlil dari daftar di bawah ini dengan mengetik perintah: ${usedPrefix}tahlil-get [nomor]_:\n`;

       
        Object.values(res.result.data).forEach((v, index) => {
            teks += `*${index + 1}. ${v.title}*\n` +
                    `   - Arabic: ${v.arabic}\n\n`;
        });

        teks += `\nContoh: ${usedPrefix}tahlil-get 1`;

        // Mengirim pesan daftar doa tahlil
        return m.reply(teks);
    }

    if (command == 'tahlil-get') {
       
        let res = await (await fetch('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/religion/tahlil.json')).json();

       
        if (!text || isNaN(text) || text < 1 || text > Object.values(res.result.data).length) {
            return m.reply(`🚫 *Nomor doa tidak valid.* Silakan masukkan nomor yang sesuai dari daftar.`);
        }

       
        let { title, arabic, translation } = res.result.data[text - 1];

     
        let teks = `📿 *Doa Tahlil: ${title}*\n\n` +
                   `🕌 *Teks Arab:* \n${arabic}\n\n` +
                   `📖 *Terjemahan:* \n${translation}\n\n` +
                   `✨ Semoga kita senantiasa dalam lindungan Allah SWT. Aamiin.`;

      
        return m.reply(teks);
    }
};

handler.help = ['tahlil'];
handler.tags = ['quran'];
handler.command = /^(tahlil|tahlil-get)$/i;
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
