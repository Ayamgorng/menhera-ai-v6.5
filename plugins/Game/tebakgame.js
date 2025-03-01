const fs = require('fs-extra')
let timeout = 120000;
let poin = 4999;
let handler = async (m, { hanz, command, usedPrefix }) => {
  hanz.game = hanz.game ? hanz.game : {};
  let id = "tebakgame-" + m.chat;
  if (id in hanz.game)
    return hanz.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      hanz.game[id][0]
    );
  let src = JSON.parse(fs.readFileSync("./lib/game/tebakgame.json", "utf-8"));
  let json = src[Math.floor(Math.random() * src.length)];
  let caption = `
Logo apakah ini?

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hgame untuk bantuan
Bonus: ${poin} XP
`.trim();
  hanz.game[id] = [
    await hanz.sendFile(m.chat, json.img, "tebakgame.jpg", caption, m),
    json,
    poin,
    setTimeout(() => {
      if (hanz.game[id])
        hanz.reply(
          m.chat,
          `Waktu habis!\nJawabannya adalah *${json.jawaban}*`,
          hanz.game[id][0]
        );
      delete hanz.game[id];
    }, timeout),
  ];
};
handler.help = ["tebakgame"];
handler.tags = ["game"];
handler.command = /^tebakgame$/i;
handler.onlyprem = true;
handler.game = true;

module.exports = handler;
