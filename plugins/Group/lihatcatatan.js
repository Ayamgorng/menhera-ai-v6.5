let handler = async(m, {hanz, command, usedPrefix}) => {
 
  let catatan = global.db.data.users[m.sender].catatan || []

 
  if (catatan.length === 0) {
    return m.reply('Anda belum memiliki catatan! Ketik perintah untuk membuat catatan.')
  }

  
  let message = 'Daftar Catatan Anda:\n\n'
  catatan.forEach((cttn, index) => {
    message += `${index + 1}. *${cttn.title}*\n   Catatan: ${cttn.isi}\n\n`
  })


  hanz.reply(m.chat, message, m)
}

handler.help = ['lihatcatatan']
handler.tags = ['internet']
handler.command = /^lihatcatatan$/i

module.exports = handler