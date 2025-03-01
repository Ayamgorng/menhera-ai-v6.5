const fs = require('fs');
const axios = require('axios');
const uploadImage = require('../../lib/uploadImage'); 
const handler = async (m, { hanz, command, text }) => {
    const isQuotedImage = m.quoted && m.quoted.mtype === 'imageMessage'; 
    const isImage = m.mtype === 'imageMessage'; 
    const quoted = m.quoted ? m.quoted : m;

   
    if (isImage || isQuotedImage) {
        try {
         
            const mediaPath = await hanz.downloadAndSaveMediaMessage(quoted);
            const media = fs.readFileSync(mediaPath);

          
            const uploadedImageUrl = await uploadImage(media);
            console.log('Gambar berhasil diupload:', uploadedImageUrl);

        
            const apiUrl = `https://gemini-api-5k0h.onrender.com/gemini/image`;
            const params = {
                q: 'What is this picture? Please describe it.', 
                url: uploadedImageUrl 
            };

            const response = await axios.get(apiUrl, { params });
            const description = response.data?.content || 'Gagal mendapatkan deskripsi gambar.';

           
            await hanz.sendMessage(m.chat, {
                text: `📷 *Deskripsi Gambar:*\n${description}`
            }, { quoted: m });

           
            fs.unlinkSync(mediaPath);
        } catch (error) {
            console.error('Error deskripsi gambar:', error);
            await hanz.sendMessage(m.key.remoteJid, {
                text: '❌ Terjadi kesalahan saat memproses gambar.'
            }, { quoted: m });
        }
    } else {
       
        try {
            if (!text) return hanz.sendMessage(m.key.remoteJid, { text: '❌ Harap masukkan teks untuk AI Gemini.' }, { quoted: m });

         
            const apiUrl = `https://gemini-api-5k0h.onrender.com/gemini/chat`;
            const params = { q: text };

            const response = await axios.get(apiUrl, { params });
            const replyText = response.data?.content || 'Gagal mendapatkan respons AI.';

         
            await hanz.sendMessage(m.chat, {
                text: `🤖 *AI Gemini:*\n${replyText}`
            }, { quoted: m });
        } catch (error) {
            console.error('Error Gemini Chat:', error);
            await hanz.sendMessage(m.key.remoteJid, {
                text: '❌ Terjadi kesalahan saat memproses permintaan AI.'
            }, { quoted: m });
        }
    }
};

handler.tags = ['aigemini'];
handler.command = ['aigemini'];
handler.onlyGroup = true; 
handler.noCmdStore = true; 
handler.description = ['Interaksi AI Gemini: teks atau gambar'];
module.exports = handler;