
const fs = require('fs');
const { getBuffer } = require('../../lib/myfunc');
const uploadToCatbox = require('../../lib/uploadToCatbox');

const handler = async (m, { hanz, command, prefix }) => {
    
    const isQuotedImage = m.quoted && m.quoted.mtype === 'imageMessage';
    const isImage = m.mtype === 'imageMessage'; 
    const quoted = m.quoted ? m.quoted : m;

    if (!isImage && !isQuotedImage) {
        return hanz.reply(m.chat, `Kirim gambar lalu reply ${prefix + command} atau tag gambar yang sudah dikirim.`, m);
    }
    m.reply(mess.wait);

    try {
      let mediaPath = await hanz.downloadAndSaveMediaMessage(quoted); 
        let mediaBuffer = fs.readFileSync(mediaPath); 
        let wewek = await uploadToCatbox(mediaBuffer); 
        let ini_gen = `${command}`;
        let resultBuffer = await getBuffer(`https://skizoasia.xyz/api/toanime?url=${wewek}&apikey=Rangelofficial`);

        
        await hanz.sendMessage(m.chat, {
            image: resultBuffer,
            caption: `*Nih Kak Kamu jadi Anime*`,
            
        }, { quoted: m });

        
        fs.unlinkSync(mediaPath);
    } catch (err) {
        console.error(err);
        hanz.reply(m.chat, '⚠️ Terjadi kesalahan, coba lagi nanti.', m);
    }
};

handler.help = ['jadianime', 'toanime'];
handler.tags = ['anime'];
handler.command = /^(jadianime|toanime)$/i;
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["ubah gambarmu menjadi anime"]
module.exports = handler;
