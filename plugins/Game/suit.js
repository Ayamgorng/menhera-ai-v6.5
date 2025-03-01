let timeout = 60000
let poin = 500
let poin_lose = -100
let handler = async (m, { hanz, usedPrefix, args }) => {
  hanz.suit = hanz.suit ? hanz.suit : {}
  if (Object.values(hanz.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw 'Selesaikan suit mu yang sebelumnya'
  if (Object.values(hanz.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `Orang yang kamu tantang sedang bermain suit bersama orang lain :(`
  let musuh = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
  if (!musuh) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya.. Contoh\n\n${usedPrefix}suit @${m.sender.replace(/@.+/, '')}`, m.chat, { contextInfo: { mentionedJid: [m.sender] } })
  let id = 'suit_' + new Date() * 1
  let caption = `
_*SUIT PvP*_

@${m.sender.split`@`[0]} menantang @${m.mentionedJid[0].split`@`[0]} untuk bermain suit

Silahkan @${m.mentionedJid[0].split`@`[0]} 
`.trim()
  let footer = `\n\nKetik "terima/ok/gas" untuk memulai suit\nKetik "tolak/gabisa/nanti" untuk menolak`
  hanz.suit[id] = {
    chat: await hanz.reply(m.chat, caption + footer, m, { mentions: hanz.parseMention(caption) }),
    id: id,
    p: m.sender,
    p2: musuh,
    status: 'wait',
    waktu: setTimeout(() => {
      if (hanz.suit[id]) hanz.reply(m.chat, `_Waktu suit habis_`, m)
      delete hanz.suit[id]
    }, timeout), poin, poin_lose, timeout
  }
}
handler.tags = ['game']
handler.help = ['suit'].map(v => v + ' @tag')
handler.command = /^suit$/i
handler.group = true
handler.limit = true

module.exports = handler