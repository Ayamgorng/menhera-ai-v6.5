const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');

const handler = async (m, { hanz, setReply }) => {
  const args = m.budy.split(' ').slice(1); 
  const isQuotedVideo = m.quoted && m.quoted.mtype === 'videoMessage'; // 
const quoted = m.quoted ? m.quoted : m
  if (!isQuotedVideo) {
    return setReply('Reply video-nya!');
  }

  if (Number(args[0]) >= 11) {
    return setReply('Maksimal volume adalah 10');
  }

  try {
    await setReply('Proses mengubah volume video...'); 
    let media3 = await hanz.downloadAndSaveMediaMessage(quoted, getRandom(''));
    let rname = getRandom('.mp4'); 

    exec(`ffmpeg -i ${media3} -filter:a "volume=${args[0]}" ${rname}`, async (err) => {
      if (err) {
        fs.unlinkSync(media3);
        return setReply('masukan kata kunci 1 sampai 10\n Contoh .vilvideo 4!');
      }

      let videoData = fs.readFileSync(rname);
      await hanz.sendMessage(
        m.chat,
        { video: videoData, caption: 'Video dengan volume yang diubah' },
        { quoted: m }
      );
      fs.unlinkSync(rname);
      fs.unlinkSync(media3);
    });
  } catch (e) {
    console.error(e);
    setReply('Terjadi kesalahan saat mengunduh atau memproses video!');
  }
};

handler.help = ['volvideo'];
handler.command = ['volvideo','volvid'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["mempertinggi/kurang volume video"]

module.exports = handler;
