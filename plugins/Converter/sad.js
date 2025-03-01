const fetch = require('node-fetch');

const handler = async (m, { hanz, setReply, prefix, command, args }) => {
  try {
    const sadNumber = parseInt(args[0], 10); 

    if (isNaN(sadNumber) || sadNumber < 1 || sadNumber > 34) {
        return setReply('Masukkan nomor antara 1 dan 34\nContoh: .sad 2');
    }

    let contextInfo = {
        externalAdReply: {
            showAdAttribution: true, 
            title: `🎼 Melodi Sedih: Perjalanan Emosi 🎵`, 
            body: `💔 Biarkan lagu-lagu ini menyentuh hatimu. Klik untuk mendengarkan.`,
            description: 'Masuki kedalaman kesedihan...',
            mediaType: 2,
            thumbnailUrl: 'https://pomf2.lain.la/f/hjyhue9n.jpg',
            mediaUrl: 'https://youtu.be/lKfgv1-3Ty4?si=jvWuT5H-WRJcI2Ey'
        }
    };

    const sadURL = `https://github.com/Rangelofficial/Sad-Music/raw/main/audio-sad/sad${sadNumber}.mp3`;
    const response = await fetch(sadURL);
    if (!response.ok) throw new Error("Gagal mengunduh audio");

    const sadBuffer = await response.buffer();
    await hanz.sendMessage(m.chat, { 
        audio: sadBuffer, 
        mimetype: 'audio/mp4', 
        ptt: true, 
        contextInfo 
    }, { quoted: m });

  } catch (error) {
    setReply("Terjadi kesalahan saat mengunduh atau mengirim audio.");
    console.error(error);
  }
};

handler.help = ['sad'];
handler.command = ['sad'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["random audio sad"]

module.exports = handler;
