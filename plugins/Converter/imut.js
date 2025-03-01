const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');

const handler = async (m, { hanz, setReply, sendMusic, sendReact }) => {
  try {
    const isQuotedAudio = m.quoted && m.quoted.mtype === 'audioMessage';
    if (isQuotedAudio) {
      sendReact('🕚');
      
      let medok = await hanz.downloadAndSaveMediaMessage(m.quoted);
      let ran = getRandom('.mp3'); 
      
        exec(`ffmpeg -i ${medok} -af atempo=1/2,asetrate=44500*2/1 ${ran}`, async (err, stderr, stdout) => {

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

handler.help = ['imut'];
handler.command = ['imut'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["ubah audio jadi imut"]

module.exports = handler;

