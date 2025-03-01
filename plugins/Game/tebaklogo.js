let fetch = require('node-fetch')
let timeout = 120000
let poin = 4999
let handler = async (m, { hanz, command, usedPrefix }) => {
    hanz.tebaklogo = hanz.tebaklogo ? hanz.tebaklogo : {}
    let id = m.chat
    if (id in hanz.tebaklogo) {
        hanz.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', hanz.tebaklogo[id][0])
        throw false
    }
    let res = await fetch(`https://raw.githubusercontent.com/orderku/db/main/dbbot/game/tebakapp.json`)
    let src = await res.json()
    let Apps = src[Math.floor(Math.random() * src.length)]
    let json = { hasil: Apps }
    let caption = `*${command.toUpperCase()}*
Logo apakah ini?

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hlog untuk hint
Bonus: ${poin} XP
    `.trim()
    hanz.tebaklogo[id] = [
        await hanz.sendFile(m.chat, json.hasil.data.image, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (hanz.tebaklogo[id]) hanz.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.hasil.data.jawaban}*`, hanz.tebaklogo[id][0])
            delete hanz.tebaklogo[id]
        }, timeout)
    ]
}
handler.help = ['tebaklogo']
handler.tags = ['game']
handler.command = /^tebaklogo/i

module.exports = handler;