const fs = require("fs");

let handler = (m) => m;

handler.before = async function (m, { hanz }) {
  const type = m.message ? Object.keys(m.message)[0] : '';
  const pesilit = (type === 'conversation' && m.message.conversation) 
    ? m.message.conversation 
    : (type === 'imageMessage' && m.message.imageMessage.caption) 
    ? m.message.imageMessage.caption 
    : (type === 'videoMessage' && m.message.videoMessage.caption) 
    ? m.message.videoMessage.caption 
    : (type === 'extendedTextMessage' && m.message.extendedTextMessage.text) 
    ? m.message.extendedTextMessage.text 
    : '';

  const messagesD = pesilit.slice(0).trim().split(/ +/).shift().toLowerCase();
  const messagesC = pesilit.slice(0).trim();
    
const imagenya = JSON.parse(fs.readFileSync('./json/image.json'))
const videonya = JSON.parse(fs.readFileSync('./json/video.json'))

  // AUTO RESPON VIDEO
  if (videonya.includes(messagesC)) {
    let namastc = messagesC;
    let buffer = fs.readFileSync(`./temp/video/${namastc}.mp4`); // Path to video
    hanz.sendMessage(m.chat, { video: buffer }, { quoted: m });
  }

  // AUTO RESPON IMAGE
  if (imagenya.includes(messagesC)) {
    let namastc = messagesC;
    let buffer = fs.readFileSync(`./temp/image/${namastc}.jpg`); // Path to image
    hanz.sendMessage(m.chat, { image: buffer }, { quoted: m });
  }
    // AUTO RESPON TEKS
let listRespon = global.db.data.respon[m.text]
if(listRespon) m.reply(listRespon.respon)
    
};

module.exports = handler;
