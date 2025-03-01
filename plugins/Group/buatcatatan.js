let handler = async(m, {hanz, command, usedPrefix, text}) => {
  let fail = `Format salah! Contoh yang benar: ${usedPrefix}${command} <judul|deskripsi>\nContoh: ${usedPrefix}${command} Bot|1. Masak`
  

  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || []
  let catatan = global.db.data.users[m.sender].catatan
  

  let split = text.split('|')
  let title = split[0]
  let isi = split[1]

  
  if (catatan.some(cttn => cttn.title === title)) {
    return m.reply('Judul sudah terdaftar! \nAlasan: Sudah digunakan sebelumnya.')
  }

  
  if (!title || !isi) return m.reply(fail)
  
  
  let cttn = {
    title: title,
    isi: isi
  }
  global.db.data.users[m.sender].catatan.push(cttn)

 
  hanz.reply(m.chat, `Catatan berhasil dibuat! Untuk melihat catatan yang ada, ketik: ${usedPrefix}lihatcatatan`, m, false, {
    contextInfo: {
      mentionedJid: hanz.parseMention(text)
    }
  })
}

handler.help = ['buatcatatan <judul|deskripsi>']
handler.tags = ['internet']
handler.command = /^buatcatatan$/i

module.exports = handler