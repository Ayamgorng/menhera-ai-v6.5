const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');

const handler = async (m, { hanz, setReply, sendReact }) => {
  const isQuotedAudio = m.quoted && m.quoted.mtype === 'audioMessage'; 

  if (!isQuotedAudio) {
    return setReply("Reply audio-nya");
  }

  if (m.quoted.duration < 30) {
    return setReply('Audio harus lebih dari 30 detik');
  }

  try {
    setReply('Proses memotong audio menjadi bagian per 30 detik...');
    sendReact('🕚'); 
    let media = await hanz.downloadAndSaveMediaMessage(m.quoted, getRandom(''));

    exec(`ffmpeg -i ${media} -f segment -segment_time 30 -reset_timestamps 1 output%03d.mp3`, async (err) => {
      fs.unlinkSync(media); 

      if (err) {
        return setReply('Terjadi kesalahan saat memproses audio');
      }
      const directoryPath = path.resolve('./'); 
      fs.readdir(directoryPath, async function (err, files) {
        if (err) return setReply('Terjadi kesalahan saat membaca direktori hasil.');

        const filteredArray = files.filter(file => file.startsWith("output"));
        
        for (const file of filteredArray) {
          const filePath = path.join(directoryPath, file);
          
          if (fs.existsSync(filePath)) {
            await hanz.sendMessage(
              m.chat,
              { audio: fs.readFileSync(filePath), mimetype: 'audio/mp4', ptt: true },
              { quoted: m }
            );
            fs.unlinkSync(filePath); 
          }
        }
      });
    });

    await m.reply('Jika audio tidak bisa diputar, silakan reply audio dengan mengetik .tovn');
  } catch (e) {
    console.error(e);
    setReply('Terjadi kesalahan saat mengunduh atau memproses audio!');
  }
};

handler.help = ['cutaudio'];
handler.command = ['cutaudio'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["potong audio mu jadi per 30detik"]
handler.limit = true

module.exports = handler;

            