const { getBuffer } = require('../../lib/myfunc'); 

const handler = async (m, { hanz, setReply, prefix, command }) => {
  try {
    const citaNumber = Math.floor(Math.random() * 34) + 1;

    let contextInfo = {
        externalAdReply: {
            showAdAttribution: false, 
            title: `🌟 Cita-Cita: Impian yang Menginspirasi 🎯`, 
            body: `✨ Dengarkan lagu yang membangkitkan semangatmu. Klik untuk mendengarkan.`,
            description: 'Mengejar impianmu...',
            mediaType: 2,
            thumbnailUrl: 'https://pomf2.lain.la/f/4v2hxdto.jpg',
            mediaUrl: 'https://youtu.be/lKfgv1-3Ty4?si=jvWuT5H-WRJcI2Ey'
        }
    };
  
    const citaURL = `https://raw.githubusercontent.com/BadXyz/txt/main/citacita/citacita${citaNumber}.mp3`;
    const citaBuffer = await getBuffer(citaURL);
    await hanz.sendMessage(m.chat, { 
        audio: citaBuffer, 
        mimetype: 'audio/mpeg', 
        ptt: true, 
        contextInfo 
    }, { quoted: m });

  } catch (error) {
    setReply("Terjadi kesalahan saat mengunduh atau mengirim audio.");
    console.error(error);
  }
};

handler.help = ['citacita'];
handler.command = ['citacita'];
handler.tags = ['convert'];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["random sound"]

module.exports = handler;
