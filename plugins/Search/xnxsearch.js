
const fetch = require("node-fetch");

let handler = async (m, { hanz, text, usedPrefix, command }) => {
  if (!text) throw `• *Example :* ${usedPrefix + command} stepmoms`;

  let response = await fetch(`https://api.agatz.xyz/api/xnxx?message=${text}`);
  let res = await response.json();

  if (res.status !== 200) throw `API Error: ${res.creator}`;

  let resultText = '';
  for (let i = 0; i < res.data.result.length; i++) {
    let result = res.data.result[i];
    let hasil = `• Title: *${result.title}*\n• Info: *${result.info}*\n• Link: *${result.link}*\n`;
    resultText += hasil + '\n';
  }
  let name = m.sender;  
  m.reply(mess.wait)
  await hanz.sendMessage(m.chat, {
    text: resultText
  });
};

handler.command = handler.help = ['xnxsearch'];
handler.tags = ['internet'];
handler.premium = true;

module.exports = handler;