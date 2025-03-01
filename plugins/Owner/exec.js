/*const { exec } = require('child_process');

let handler = async (m, { hanz, isOwner, itsMe, text,onlyOwner }) => {
  if (!m.itsMe && !isOwner) {
    return onlyOwner()
  }

  if (!text) {
    return m.reply("_Mohon masukkan perintah yang akan dijalankan._");
  }

  m.reply("_Executing..._");

  exec(text, (err, stdout) => {
    if (err) {
      return m.reply(`_*Error:*_ ${err.message}`);
    }
    if (stdout) {
      m.reply(`*>_ Console Output*\n\n${stdout}`);
    }
  });
};

handler.command = /^\$/;  
handler.owner = true;    

module.exports = handler;*/
