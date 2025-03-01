const fetch = require('node-fetch');

let handler = async (m, { hanz,sendReact }) => {
  try {
      sendReact('🕚')
    let anu = await fetch('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json').then(res => res.json());
    let random = anu[Math.floor(Math.random() * anu.length)];
   
    hanz.sendMessage(m.chat, {
      image: { url: random.male },
      caption: '- Couple Male'
    }, { quoted: m });
    
    hanz.sendMessage(m.chat, {
      image: { url: random.female },
      caption: '- Couple Female'
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    hanz.sendMessage(m.chat, { text: 'Terjadi kesalahan saat mengambil pasangan.' });
  }
};

handler.help = handler.command = ['couple','ppcp'];
handler.tags = ['random'];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["profil cocok buat yang berpasangan "]

module.exports = handler;
