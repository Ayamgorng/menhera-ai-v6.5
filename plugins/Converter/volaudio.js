const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');

const handler = async (m, { hanz, setReply }) => {
  const args = m.budy.split(' ').slice(1); 
  const isQuotedAudio = m.quoted && m.quoted.mtype === 'audioMessage'; 

  if (!isQuotedAudio) {
    return setReply('Reply audio-nya!');
  }

  if (Number(args[0]) >= 11) {
    return setReply('Maksimal volume adalah 10');
  }

  try {
    await setReply('Proses mengubah volume...'); 
    let media3 = await hanz.downloadAndSaveMediaMessage(m.quoted, getRandom(''));
    let rname = getRandom('.mp3');
    exec(`ffmpeg -i ${media3} -filter:a "volume=${args[0]}" ${rname}`, async (err) => {
      if (err) {
        fs.unlinkSync(media3); 
        return setReply('Terjadi kesalahan saat memproses audio!');
      }
      let jadie = fs.readFileSync(rname);
      await hanz.sendMessage(
        m.chat,
        { audio: jadie, mimetype: 'audio/mp4', ptt: true },
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

handler.help = ['volumeaudio'];
handler.command = ['volumeaudio','volaud'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["mempertinggi/kurang suara audiomu"]

module.exports = handler;
