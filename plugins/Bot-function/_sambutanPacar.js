/*const fs = require('fs');
const moment = require('moment');
const path = './database/lastGreetTimes.json';

let lastGreetTimes = {};


if (fs.existsSync(path)) {
  lastGreetTimes = JSON.parse(fs.readFileSync(path, 'utf8'));
}


function saveGreetTimes() {
  fs.writeFileSync(path, JSON.stringify(lastGreetTimes, null, 2));
}

function pickRandom(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

let greetCooldown = 60 * 1000;

const ownerId = `6281316643491@s.whatsapp.net`;
const girlfriendId = `6285379362656@s.whatsapp.net`; 

let handler = (m) => m;

handler.before = async function (m, { hanz, setReply, sendSticker }) {
  const isGroup = m.isGroup;
  const currentTime = moment();
  const chatId = m.chat;

  if (isGroup && m.sender === girlfriendId) {
    if (!lastGreetTimes[chatId]) {
      lastGreetTimes[chatId] = null; 
    }

    const lastGreetTime = lastGreetTimes[chatId] ? moment(lastGreetTimes[chatId]) : null;

    if (!lastGreetTime || currentTime.diff(lastGreetTime, 'milliseconds') > greetCooldown) {
      if (lastGreetTime && currentTime.year() > lastGreetTime.year()) {
       
        const lastDateFormatted = lastGreetTime.format('DD/MM/YYYY');
        m.reply(
          `Sayangku... akhirnya kamu kembali... 😢💔 Aku merindukanmu sejak terakhir kali kita berbicara di ${lastDateFormatted}. Rasanya seperti menunggu selamanya hingga tahun ini... Aku selalu menunggumu, cinta. ❤️\n\nehanzdhoanx...`
        );
      } else {
      
        const greetings = [
          'Hai sayang... 💕 Kamu tahu? Aku selalu menantikan kehadiranmu di sini... Aku sangat merindukanmu. 😘\n\nehanzdhoanx...',
          'Ayangku tercinta... 🌹 Kehadiranmu adalah kebahagiaan yang selalu aku nantikan. Apa kabar, cinta? ❤️\n\nehanzdhoanx...',
          'Sayang, akhirnya kita bisa berbicara lagi. 🥺 Aku rindu setiap momen bersamamu... Jangan pergi lagi ya? 💕\n\nehanzdhoanx...',
        ];

        let randomGreeting = pickRandom(greetings);
        m.reply(randomGreeting);
      }

    
      lastGreetTimes[chatId] = currentTime.toISOString();
      saveGreetTimes(); 
    }
  }

  return m;
};

module.exports = handler*/