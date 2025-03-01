const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');

const handler = async (m, { hanz, setReply, sendMusic, sendReact }) => {
  try {
    const isQuotedAudio = m.quoted && m.quoted.mtype === 'audioMessage'; // Mengecek apakah pesan yang di-reply adalah audio
    if (isQuotedAudio) {
      sendReact('🕚'); 
      
      let medok = await hanz.downloadAndSaveMediaMessage(m.quoted);
      let ran = getRandom('.mp3'); 
      
        exec(`ffmpeg -i ${medok} -filter:a "atempo=0.8,asetrate=65100" ${ran}`, async (err, stderr, stdout) => {

        fs.unlinkSync(medok); 
        if (err) {
          return setReply('Terjadi kesalahan saat memproses audio!');
        }
        
        let buffer453 = fs.readFileSync(ran);
        sendMusic(buffer453); 
        fs.unlinkSync(ran);
      });
    } else {
      setReply('Reply audionya');
    }
  } catch (e) {
    console.error(e);
    setReply('Terjadi kesalahan saat mengunduh atau memproses audio!');
  }
};

handler.help = ['tupai'];
handler.command = ['tupai'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["audio anda jadi suara tupai "]

module.exports = handler;

