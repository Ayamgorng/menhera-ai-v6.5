
let handler = async (m, { hanz }) => {
  var ayg = global.db.data.users[m.sender]
  var beb = global.db.data.users[global.db.data.users[m.sender].pasangan]

  if(ayg.pasangan == ""){
    return hanz.reply(m.chat,`Kamu Tdak Memiliki Pasangan.`,m)
  }
  if (typeof beb == "undefined"){
    hanz.reply(m.chat,`Berhasil Putus Hubungan Dengan @${global.db.data.users[m.sender].pasangan.split('@')[0]}`,m,{contextInfo: {
      mentionedJid: [global.db.data.users[m.sender].pasangan]
    }})
    ayg.pasangan = ""
  }

  if (m.sender == beb.pasangan){
    hanz.reply(m.chat,`Berhasil Putus Hubungan Dengan @${global.db.data.users[m.sender].pasangan.split('@')[0]}`,m,{contextInfo: {
      mentionedJid: [global.db.data.users[m.sender].pasangan]
    }})
    ayg.pasangan = ""
    beb.pasangan = ""
  }else {
    hanz.reply(m.chat,`Kamu Tidak Memiliki Pasangan.`,m)
  }
}
handler.help = ['putus']
handler.tags = ['group']
handler.command = /^(putus)$/i
handler.group = true
handler.fail = null
module.exports = handler
