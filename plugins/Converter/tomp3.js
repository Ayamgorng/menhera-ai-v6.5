const fs = require('fs');
const { exec } = require('child_process');
const { getRandomFile } = require('../../lib/myfunc'); 

const handler = async (m, { hanz, setReply }) => {
  const isQuotedVideo = m.quoted && m.quoted.mtype === 'videoMessage';
  const isVideo = m.mtype === 'videoMessage'; 
const quoted = m.quoted ? m.quoted : m
  if (!(isQuotedVideo || isVideo)) {
    return setReply('Reply videonya!');
  }

  try {
    setReply('Proses mengonversi video ke audio...');
    
   
    let media = await hanz.downloadAndSaveMediaMessage(quoted);

    
    let ran = getRandomFile('.mp3');
    
    exec(`ffmpeg -i ${media} -vn ${ran}`, async (err) => {
      fs.unlinkSync(media); 

      if (err) {
        return setReply(`Terjadi kesalahan: ${err.message}`);
      }

    
      let buffer453 = fs.readFileSync(ran);
      
    
      await hanz.sendMessage(m.chat, { mimetype: 'audio/mp4', audio: buffer453 }, { quoted: m });

      
      fs.unlinkSync(ran);
    });
  } catch (e) {
    console.error(e);
    setReply('Terjadi kesalahan saat memproses video!');
  }
};

handler.help = ['tomp3'];
handler.command = ['tomp3'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["ambil audio dari videomu"]

module.exports = handler;
