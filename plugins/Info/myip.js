const axios = require('axios');

let handler = async (m, { hanz }) => {
  try {
    const { data } = await axios.get('https://api.ipify.org');
    hanz.reply(m.chat, `IP kamu adalah ${data}`, m);
  } catch (e) {
    hanz.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan.', m);
    console.log(e);
  }
}

handler.help = ['myip'];
handler.tags = ['owner'];
handler.command = /^myip$/i;

handler.register = true;


module.exports = handler;
