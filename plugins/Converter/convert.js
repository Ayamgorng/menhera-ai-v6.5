const { exec } = require('child_process');
const fs = require('fs');
const { getRandom } = require('../../lib/myfunc');


const handler = async (m, { hanz, prefix,command,setReply,sendMusic,sendReact}) => {
 
    const mime = (m.quoted.msg || m.quoted).mimetype || ''
  if (!m.quoted || !/audio/.test(mime)) {
    return setReply('Reply audio yang ingin diberi efek!');
  }

  if (!m.isGroup) {
    return setReply('Fitur ini hanya bisa digunakan di grup!');
  }

  try {
    let set;

    // Memilih efek sesuai dengan perintah
    if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
    if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
    if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
    if (/earrape/.test(command)) set = '-af volume=12';
    if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
    if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
    if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
    if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
    if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
    if (/chipmunk/.test(command)) set = '-filter:a "atempo=1.5,asetrate=44100*1.5"';
    if (/reverb/.test(command)) set = '-af "aecho=0.8:0.9:1000:0.3"';
    if (/vocaloid/.test(command)) set = '-af "rubberband=tempo=1.2"';
    if (/reverse/.test(command)) set = '-filter:a "areverse"';
    if (/nightcore/.test(command)) set = '-filter:a "atempo=1.25,asetrate=44100*1.25"';

    await sendReact('🔎'); 
    let media = await hanz.downloadAndSaveMediaMessage(m.quoted);
    let ran = getRandom('.mp3');

    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
      fs.unlinkSync(media); 
      if (err) return setReply(`Error: ${err.message}`);

      let buff = fs.readFileSync(ran); 
      sendMusic(buff); 
      fs.unlinkSync(ran);
    });
  } catch (e) {
    console.error(e);
    setReply(`Terjadi kesalahan: ${e.message}`);
  }
};

handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'robot', 'slow', 'smooth', 'chipmunk', 'reverb', 'vocaloid', 'reverse', 'nightcore'];
handler.command = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'robot', 'slow', 'smooth', 'chipmunk', 'reverb', 'vocaloid', 'reverse', 'nightcore'];
handler.tags = ['convert'];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["kumpulan convert audio"]

module.exports = handler;
