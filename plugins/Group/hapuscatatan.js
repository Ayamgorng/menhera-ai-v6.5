let handler = async(m, {hanz, command, usedPrefix, text}) => {
 
  let catatan = global.db.data.users[m.sender].catatan || []

 
  if (!text || isNaN(text)) {
    return m.reply(`Format salah! Ketik: ${usedPrefix}${command} <nomor catatan>\nContoh: ${usedPrefix}${command} 1`)
  }

  let index = parseInt(text) - 1  
  if (index < 0 || index >= catatan.length) {
    return m.reply('Catatan dengan nomor tersebut tidak ditemukan!')
  }


  catatan.splice(index, 1)

  
  hanz.reply(m.chat, `Catatan nomor ${text} berhasil dihapus!`, m)
}

handler.help = ['delcatatan <nomor>']
handler.tags = ['internet']
handler.command = /^hapuscatatan$/i

module.exports = handler