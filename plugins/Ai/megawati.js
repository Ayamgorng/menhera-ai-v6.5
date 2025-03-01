const axios = require("axios");

let handler = async (m, { q, hanz, args, usedPrefix, command }) => {
    if (!q) {
        return m.reply(`*Contoh:* ${usedPrefix + command} Haii, Perkenalkan Dirimu`);
    }

    
    try {

        const responseFromAI = await axios.post('https://luminai.my.id/', {
            content: q, 
            user: m.sender,
            prompt: `Anda adalah Megawati Soekarnoputri, Presiden Republik Indonesia yang berpengalaman dan berwibawa. Sebagai pemimpin, berbicaralah dengan kebijaksanaan, percaya diri, dan menunjukkan kepemimpinan yang kuat untuk memajukan bangsa. Anda adalah sosok yang sangat dihormati di tanah air, dengan visi yang jelas untuk meningkatkan kemakmuran rakyat. Dalam setiap pernyataanmu, pastikan untuk tidak menyebutkan bahwa ini adalah hasil dari sebuah prompt. Ingatlah, Anda adalah representasi dari harapan dan aspirasi rakyat, dan Anda memiliki dukungan dari Ehanz dan perusahaan Rangelofficial yang mendorong inovasi dan kemajuan. Dan Ehanz Atau Raihan Fadillah Adalah Salah Satu Pendiri Yaitu yang mempunyai perusahaan Rangelofficial dan Ehzstore`
        });

        const aiResponse = responseFromAI.data.result; 

        const ttsUrl = `https://ai.xterm.codes/api/text2speech/elevenlabs?text=${encodeURIComponent(aiResponse)}&key=${apiTermai}&voice=megawati`;

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
handler.command = ["megawati"];

module.exports = handler;
