const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');

const handler = async (m, { hanz, setReply, sendReact }) => {
  try {
    const isQuotedAudio = m.quoted && m.quoted.mtype === 'audioMessage'; 
    if (isQuotedAudio) {
      sendReact('🕚'); 
      
      let medok = await hanz.downloadAndSaveMediaMessage(m.quoted);
      let ran = getRandom('.mp3'); 
      
      exec(`ffmpeg -i ${medok} ${ran}`, async (err) => {
        fs.unlinkSync(medok); 
        
        if (err) return setReply('Gagal mengkonversi audio ke audio');
        
        let topt = fs.readFileSync(ran);
        
        await hanz.sendMessage(
          m.chat,
          { audio: topt, mimetype: 'audio/mp4'},
          { quoted: m }
        );

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

handler.help = ['toaud'];
handler.command = ['toaud', 'toaudio'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["ubah vn jadi audio"]

module.exports = handler;
