const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { getRandom } = require('../../lib/myfunc');

const handler = async (m, { hanz, setReply, sendReact }) => {
  const isQuotedVideo = m.quoted && m.quoted.mtype === 'videoMessage'; 
const isVideo = m.mtype === 'videoMessage'; 

  const quoted = m.quoted ? m.quoted : m
  if (!isQuotedVideo && !isVideo) {
    return setReply("Reply video-nya");
  }

  if (m.quoted.duration < 30) {
    return setReply('Video harus lebih dari 30 detik');
  }

  try {
    setReply('Proses memotong video menjadi bagian per 30 detik...');
    sendReact('🕚'); 
    let media = await hanz.downloadAndSaveMediaMessage(quoted, getRandom(''));
    exec(`ffmpeg -i ${media} -c copy -map 0 -segment_time 00:00:30 -f segment -reset_timestamps 1 output%03d.mp4`, async (err) => {
      fs.unlinkSync(media); 

      if (err) {
        return setReply('Terjadi kesalahan saat memproses video');
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
              { video: fs.readFileSync(filePath), caption: file },
              { quoted: m }
            );
            fs.unlinkSync(filePath); 
          }
        }
      });
    });
  } catch (e) {
    console.error(e);
    setReply('Terjadi kesalahan saat mengunduh atau memproses video!');
  }
};

handler.help = ['cutvideo'];
handler.command = ['cutvideo'];
handler.tags = ['convert'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["potong videomu jadi per 30detik"]
handler.limit = true

module.exports = handler;
