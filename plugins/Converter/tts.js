const fs = require('fs');
const { getBuffer } = require('../../lib/myfunc');
const gtts = require('node-gtts');

const handler = async (m, { hanz, setReply, prefix, command, args }) => {
  try {
 
    if (!args.length) {
      return setReply(`Use Example: ${prefix}${command} en Hello world`);
    }

  
    function tts(text, lang) {
      return new Promise((resolve, reject) => {
        try {
          const ttsInstance = gtts(lang);
          const filePath = `${1 * new Date()}.mp3`;
          ttsInstance.save(filePath, text, () => {
            resolve(fs.readFileSync(filePath));
            fs.unlinkSync(filePath);
          });
        } catch (e) {
          reject(e);
        }
      });
    }
    let lang = 'id'; 
    let text = args.join(' ');  
    if (args[0].length === 2 && /^[a-zA-Z]+$/.test(args[0])) {
      lang = args[0];  
      text = args.slice(1).join(' '); 
    }
    if (!text) {
      return setReply(`Use Example: ${prefix}${command} en Hello world\nAtau ${prefix}${command} Ara ara untuk bahasa Indonesia`);
    }

    let ras;
    try {
      ras = await tts(text, lang);
    } catch (e) {
      console.error(e);
      return setReply('Error while processing text-to-speech.');
    }
    await hanz.sendMedia(m.chat, ras, m, { caption: `${mess.success}` });

  } catch (e) {
    console.error(e);
    setReply(`Error: ${e.message}`);
  }
};

handler.help = ['tts'];
handler.command = ['tts'];
handler.tags = ['fun'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["teks jadi suara"]

module.exports = handler;
