const fs = require('fs');
const { getBuffer } = require('../../lib/myfunc');
const uploadToCatbox = require('../../lib/uploadToCatbox');

const handler = async (m, { hanz, command, prefix }) => {
    const isQuotedImage = m.quoted && m.quoted.mtype === 'imageMessage'; // Check if the quoted message is an image
    const isImage = m.mtype === 'imageMessage'; // Check if the current message is an image
    const quoted = m.quoted ? m.quoted : m;

    if (!isImage && !isQuotedImage) {
        return hanz.reply(m.chat, `Kirim gambar lalu reply ${prefix + command} atau tag gambar yang sudah dikirim.`, m);
    }
    m.reply('_Harap di Tunggu Membutuhkan proses agak Lama_');
    let tryng = 0;

    try {

        const mediaPath = await hanz.downloadAndSaveMediaMessage(quoted);
        const meDia = fs.readFileSync(mediaPath);
        
    
        const pok = await uploadToCatbox(meDia);
        
  
        let ai = await fetch(`https://ai.xterm.codes/api/img2img/filters?action=anime2real&url=${pok}&key=${apiTermai}`).then(a => a.json());
        
        if (!ai.status) {
            return hanz.reply(m.chat, 'Gagal memproses gambar, coba lagi nanti.', m);
        }

        console.log(ai);
        while (tryng < 55) {
            let s = await fetch(`https://ai.xterm.codes/api/img2img/filters/batchProgress?id=${ai.id}`).then(a => a.json());

            if (s.status === 1) {
                console.log("Starting...");
            }

            if (s.status === 2) {
                console.log("Processing...");
            }

            if (s.status === 3) {
   
                return hanz.sendMessage(m.chat, { image: { url: s.url } }, { quoted: m });
            }

            if (s.status === 4) {
                return hanz.reply(m.chat, "Maaf terjadi kesalahan. Coba gunakan gambar lain!", m);
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        }

    } catch (e) {
        console.error(e);
        hanz.reply(m.chat, `Type-Err! :\n${e}`, m);
    }
};

handler.help = ['jadianime', 'toanime'];
handler.tags = ['anime'];
handler.command = ['jadinyata'];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["ubah gambar kartunmu jadi seperti nyata"]
module.exports = handler;
