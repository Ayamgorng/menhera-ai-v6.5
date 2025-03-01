const axios = require('axios');

const actions = [
  'handhold', 'shinobu', 'highfive', 'cuddle', 'cringe', 'dance', 'happy', 
  'glomp', 'smug', 'blush', 'awoo', 'wave', 'smile', 'slap', 'nom', 'poke', 
  'wink', 'bonk', 'bully', 'yeet', 'bite', 'kiss', 'lick', 'pat', 'hug', 
  'kill', 'cry', 'spank', 'tickle'
];

let handler = async (m, { hanz, sendReact, command }) => {
  if (!actions.includes(command.replace('stick', ''))) {
    return hanz.sendMessage(m.chat, { text: 'Perintah tidak dikenal.' });
  }

  sendReact('🕚');
  
  try {
    const action = command.replace('stick', '');
    const apiUrl = (action === 'spank' || action === 'tickle')
      ? `https://nekos.life/api/v2/img/${action}`
      : `https://api.waifu.pics/sfw/${action}`;
      
    const { data } = await axios.get(apiUrl);

    await hanz.sendImageAsSticker(m.chat, data.url, m, {
      packname: global.packName,
      author: global.authorName
    });
  } catch (error) {
    console.error(error);
    hanz.sendMessage(m.chat, { text: 'Terjadi kesalahan saat mengambil gambar.' });
  }
};

handler.help = actions.map(action => `stick${action}`);
handler.command = handler.help;
handler.tags = ['sticker'];
handler.noCmdStore = true  
handler.onlyGroup = true

module.exports = handler;
