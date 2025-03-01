const fetch = require('node-fetch');

let handler = async (m, { hanz, text, command, sendvn,sendReact }) => {
  
  const characters = [
    'keqing', 'hutao', 'paimon', 'xiao', 'zhongli', 
    'yelan', 'diluc', 'thoma', 'lisa', 'klee', 'xinyan'
  ];

  
  let [character, ...textArray] = text.split(' ');
  let message = textArray.join(' ');
  if (!characters.includes(character)) {
    throw `• *Karakter yang tersedia:* ${characters.join(', ')}\n• *Contoh :* .ttsanime keqing Hello World`;
  }


  if (!message) {
    throw `• *Contoh :* .ttsanime keqing Hello World`;
  }

 
  let voice = character === 'xinyan' ? 'xinyan' : character;

  try {
   
    let res = await fetch(`https://skizoasia.xyz/api/tts-anime?text=${message}&lang=english&voice=${voice}&speed=0.8&symbol=y&apikey=${global.skizo}`);
    let audioNya = await res.json();
    let audionyaJuga = `${audioNya.data.url_voice}`;
sendReact('⏳')
  
    await sendvn(audionyaJuga);
  } catch (error) {
    throw 'Terjadi kesalahan saat mengambil data suara.';
  }
};

handler.command = handler.help = ['ttsanime'];

handler.tags = ['anime'];
handler.limit = true;

module.exports = handler;