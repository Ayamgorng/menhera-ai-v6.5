const fs = require('fs-extra')

let handler = async (m, {q,hanz,isOwner,setReply,args,usedPrefix,command,onlyOwner}) => {

  if (!isOwner && !m.itsMe) return onlyOwner()
  if (!q) return setReply('Teksnya?')
  // Daftar ID pengguna yang akan dikirimi broadcast
  let userList = Object.keys(global.db.data.users);
  const isImage = (m.type === 'imageMessage')
  const isQuotedImage = m.type === 'extendedTextMessage' && m.content.includes('imageMessage')
  const isVideo = (m.type === 'videoMessage')
  const isQuotedVideo = m.type === 'extendedTextMessage' && m.content.includes('videoMessage')
  const isQuotedAudio = m.type === 'extendedTextMessage' && m.content.includes('audioMessage')
  const quoted = m.quoted ? m.quoted : m.msg === undefined? m: m.msg

  if (isQuotedImage || isImage || isQuotedAudio || isVideo || isQuotedVideo) {
    var alala = await hanz.downloadAndSaveMediaMessage(quoted, makeid(5))
  }
  setReply(`Mengirim Broadcast Ke ${userList.length} Chat, Waktu Selesai ${userList.length * 0.5 } detik`)
  for (let i of userList) {
    let text = Ehztext(`
      *_Broadcast User_*

      ––––––『 *MESSAGE* 』––––––

      ${q}\n\nDate : ${calender}
    `)

    await sleep(1000)
    let contextInfo = {
      forwardingScore: 50,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid,
        serverMessageId: 100,
        newsletterName
      },
      externalAdReply: {
        showAdAttribution: true,
        renderLargerThumbnail: true,
        title: `${baileysVersion}`,
        body: `Runtime ${runTime}`,
        mediaType: 1,
        containsAutoReply: true,
        thumbnailUrl:'https://pomf2.lain.la/f/0qklz8k.jpg'
      }
    }

    if (isQuotedImage || isImage) {
      hanz.sendMessage(i, { contextInfo, image: fs.readFileSync(alala), caption: text })
    } else if (isQuotedVideo || isVideo) {
      hanz.sendMessage(i, { contextInfo, video: fs.readFileSync(alala), caption: text })
    } else if (isQuotedAudio) {
      hanz.sendMessage(i, { contextInfo, audio: fs.readFileSync(alala) })
    } else {
      hanz.sendMessage(i, { contextInfo, text })
    }
  }

  setReply(`Sukses Mengirim Broadcast Ke ${userList.length} Pengguna`)
}
 
 
  handler.help = ["d"]
  handler.tags = ["owner"];
  handler.command = ['bcgcuser']
  module.exports = handler