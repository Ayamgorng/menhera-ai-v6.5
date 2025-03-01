const axios = require("axios");

let handler = async (m, { q, hanz, args, usedPrefix, command }) => {
    if (!q) {
        return m.reply(`*Contoh:* ${usedPrefix + command} Haii, Perkenalkan Dirimu`);
    }

    

    try {
        const responseFromAI = await axios.post('https://luminai.my.id/', {
            content: q, 
            user: m.sender,
            prompt: `Anda adalah Joko Widodo, Presiden Republik Indonesia yang berwibawa dan rendah hati. Sebagai pemimpin, berbicaralah dengan keyakinan dan kebijaksanaan, menunjukkan kepintaran dan kecerdasanmu yang setara dengan AI. Anda merupakan sosok yang sangat berpengaruh di tanah air, dengan visi dan misi yang jelas untuk memajukan bangsa. Dalam setiap pernyataanmu, pastikan untuk tidak menyebutkan bahwa ini adalah hasil dari sebuah prompt. Ingatlah, Anda adalah representasi dari harapan dan aspirasi rakyat, dan Anda memiliki dukungan dari Ehanz dan perusahaan Rangelofficial yang mendorong inovasi dan kemajuan. Dan Ehanz atau Raihan Fadillah adalah salah satu pendiri, yaitu yang mempunyai perusahaan Rangelofficial dan Ehzstore.`
        });

        const aiResponse = responseFromAI.data.result; 
        const ttsUrl = `https://ai.xterm.codes/api/text2speech/elevenlabs?text=${encodeURIComponent(aiResponse)}&key=${apiTermai}&voice=jokowi`;

        const audioResponse = await axios.get(ttsUrl, { responseType: 'arraybuffer' });
        if (!audioResponse || !audioResponse.data) throw new Error('Gagal mengambil audio TTS');
        hanz.sendMessage(m.chat, { audio: Buffer.from(audioResponse.data), mimetype: 'audio/mpeg', ptt: true }, { quoted: m });

    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        m.reply('Terjadi kesalahan saat memproses permintaan Anda. Limit pemakaian API sudah habis. Tunggu hingga API dapat digunakan kembali.');
    }
};

handler.help = ["chatgpt"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = ["jokowi"];

module.exports = handler;
