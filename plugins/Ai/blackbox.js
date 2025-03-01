const fetch = require('node-fetch'); 

const handler = async (m, { q, hanz, args, command, prefix, sendSticker, otw }) => {
  try {
    
    let response = await fetch(`https://btch.us.kg/blackbox?text=${encodeURIComponent(q || "Hai")}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

   
    if (!response.ok) {
      throw new Error('Gagal mendapatkan respons dari API');
    }

  
    let data = await response.json();

    
    m.reply(`*BlackBox Response:* \n${data.result}`);
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat mengakses API BlackBox.');
  }
};

handler.help = ['blackbox>'];
handler.tags = ['ai'];
handler.command = /^(blackbox)$/i;
handler.noCmdStore = true;
handler.onlyGroup = true;
handler.description = ["ai blackbox"];

module.exports = handler;