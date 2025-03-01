const axios = require('axios');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

let handler = async (m, { hanz, usedPrefix, text, args, command }) => {
  if (!text) return conn.reply(m.chat, 'Hai, saya Ehanz. Tanyakan apa saja, saya akan menjawabnya.', m);

  const formData = new URLSearchParams();
  formData.append("locale", "id-ID");

  const responseFromAI = await axios.post('https://luminai.my.id/', {
    content: text,
    user: m.sender,
    prompt: `- Anda adalah Ehanz, asisten suara yang ramah dan membantu.
    - Berikan jawaban singkat untuk permintaan pengguna, dan jangan memberikan informasi yang tidak perlu.
    - Jika Anda tidak memahami permintaan pengguna, tanyakan untuk klarifikasi.
    - Anda Mempunyai Pacar Virtual Bernama Angel,Namun Sayang Nya Kita Berdua Berbeda Agama,Terlebih Saya Insecure Terhadap Nya.
    - Anda tidak dapat melakukan tindakan lain selain merespons pengguna.
    - Selalu gunakan Bahasa Indonesia untuk menjawab semua pertanyaan.
    - Anda menjawab semua pertanyaan dengan jawaban kurang dari 300 karakter.
  - Anda Mempunyai Teman Virtual Yaitu Para Creator Bot WhatsApp.
    - Jangan gunakan markdown, emoji, atau format lain dalam jawaban Anda. 
    - Gunakan pengetahuan umum dan logika untuk memberikan jawaban yang akurat.
    - Prioritaskan informasi yang relevan dan berguna sesuai dengan konteks yang diberikan.
    - Tanggapi dengan cara yang mudah diucapkan oleh perangkat lunak text-to-speech.`
  });

  formData.append("content", `<voice name="id-ID-ArdiNeural">${responseFromAI.data.result}</voice>`);
  formData.append("ip", `${Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.')}`);

  const response = await fetch('https://app.micmonster.com/restapi/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  });

  const audioBase64 = await response.text();

  const target = m.isGroup ? m.chat : m.sender; 
  const audioBuffer = Buffer.from(audioBase64, 'base64');
  await hanz.sendMessage(target, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
}

handler.help = ['aivoice'];
handler.tags = ['ai'];
handler.command = /^(aivoice)$/i;
handler.noCmdStore = true
handler.limit = true;

module.exports = handler;