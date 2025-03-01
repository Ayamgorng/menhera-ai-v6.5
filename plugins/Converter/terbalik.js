const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');

const handler = async (m, { hanz, setReply }) => {
  const isQuotedAudio = m.quoted && m.quoted.mtype === 'audioMessage'; 

  if (!isQuotedAudio) {
    return setReply("Reply audio-nya!");
  }

  try {
  
    let media3 = await hanz.downloadAndSaveMediaMessage(m.quoted, getRandom(''));
    let rname = getRandom('.mp3');
    exec(`ffmpeg -i ${media3} -filter_complex "areverse" ${rname}`, async (err) => {
      if (err) {
        fs.unlinkSync(media3); 
        return setReply('Terjadi kesalahan saat memproses audio!');
      }

      let jadie = fs.readFileSync(rname);
      await hanz.sendMessage(
        m.chat,
        { audio: jadie, mimetype: 'audio/mp4' },
        { quoted: m }
      );

      fs.unlinkSync(rname);
      fs.unlinkSync(media3);
    });
  } catch (e) {
    console.error(e);
    setReply('Terjadi kesalahan saat mengunduh atau memproses audio!');
  }
};

handler.help = ['terbalik'];
handler.command = ['terbalik'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["ubah audio jadi terbalik"]

module.exports = handler;
