const threshold = 0.72;
async function before(m, { hanz }) {
    
  let id = "tebakgame-" + m.chat;
  hanz.game = hanz.game ? hanz.game : {};
  if (id in hanz.game) {
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
    if (isSurrender) {
      clearTimeout(hanz.game[id][3]);
      delete hanz.game[id];
      return m.reply("*Yah Menyerah :( !*");
    }
    let json = JSON.parse(JSON.stringify(this.game[id][1]));
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += hanz.game[id][2];
      m.reply(`*Benar!*\n+${hanz.game[id][2]} XP`);
      clearTimeout(hanz.game[id][3]);
      delete hanz.game[id];
    } else if (
      similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >=
      threshold
    )
      m.reply(`*Dikit Lagi!*`);
    else m.reply(`*Salah!*`);
  }
}

module.exports = { before, exp: 0 };