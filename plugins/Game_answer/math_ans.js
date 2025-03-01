let handler = m => m
async function before(m, { hanz }) {
  hanz.math = hanz.math ? hanz.math : {}

  if ((id in hanz.math)) {
    let math = JSON.parse(JSON.stringify(hanz.math[id][1]))
    if (parseInt(m.text) === math.result) {
      db.data.users[m.sender].exp += math.bonus
      clearTimeout(hanz.math[id][3])
      delete hanz.math[id]
     m.reply(`✅ *Benar!*\n+${math.bonus} XP`)
    } else if (/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) m.reply('salah');    

  }
  
}
module.exports = handler