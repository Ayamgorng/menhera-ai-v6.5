const { getBuffer } = require('../../lib/myfunc'); 

const handler = async (m, { hanz, setReply, prefix, command, args,sendReact }) => {
  try {
 
    const soundNumber = parseInt(args[0], 10);
    if (isNaN(soundNumber) || soundNumber < 1 || soundNumber > 161) {
      return m.reply('Masukkan nomor suara antara 1 dan 161\nContoh: .sound 2');
    }
     sendReact('🕚');
    const soundURL = `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/sound${soundNumber}.mp3`;
    const soundBuffer = await getBuffer(soundURL);
    await hanz.sendMessage(m.chat, {
      audio: soundBuffer, 
      mimetype: 'audio/mp4', 
      ptt: true
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    m.reply("Terjadi kesalahan saat mengunduh atau mengirim suara.");
  }
};

handler.help = ['sound'];
handler.command = ['sound'];
handler.tags = ['fun'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["random sound"]

module.exports = handler;
