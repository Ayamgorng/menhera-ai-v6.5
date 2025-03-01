const fetch = require('node-fetch')

let handler = async (m, { hanz, command }) => {


if (m.isGroup) return  /*hanz.sendMessage(m.chat, {
      text: `Untuk Menghindari Admin Group Marah :'v\nSilahkan Cek Chat Private Bot Untuk Link Group Nya`,
      contextInfo: {
      externalAdReply: {
      title: global.botName,
      body: global.wm,
      thumbnailUrl: 'https://telegra.ph/file/4c55f8a0fd4edd4f24a62.jpg',
      mediaType: 1,
      renderLargerThumbnail: true
      }}})*/
    await
      hanz.reply(m.sender, `Grub Rangel - Multidevice\n\n${global.sgc}`, m)
 if (!m.isGroup) return m.reply(`Grub Rangel - Multidevice\n\n${global.sgc}`)
}
handler.command = /^(gcbot|gcrangel)$/i
handler.tags = ['main']
handler.help = ['gcbot']
handler.limit = false

module.exports = handler