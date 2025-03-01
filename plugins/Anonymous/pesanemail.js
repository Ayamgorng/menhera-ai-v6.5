let handler = async(m, { hanz, text, usedPrefix }) => {
let [number, pesan] = text.split `|`
let mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : number ? number.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    if (!number) return hanz.reply(m.chat, 'Silahkan masukan nomor yang akan dikirim\nContoh .pesanemail 62813×××××|Oi Aku Kirim Pesan Lewat Bot Rangel Tolong Buka Blok Gua', m)
    if (!pesan) return hanz.reply(m.chat, 'Silahkan masukan pesannya', m)
    if (text > 500) return hanz.reply(m.chat, 'Teks Kepanjangan!', m)
    
    let user = global.db.data.users[m.sender]

    let korban = `${number}`
    var nomor = m.sender
    let spam1 = `*「 📧 EMAIL 」*\n\n📫Dari : @${m.sender.replace(/@.+/, '')}@gmail.com\n💬Pesan : ${pesan}\n\n ${global.wm}`

    hanz.reply(mention, spam1, null, { mentions: [m.sender]})

    let logs = `[!] Berhasil mengirim pesan wa ke nomor ${korban}`
    hanz.reply(m.chat, logs, m)
}
handler.help = ['email']
handler.tags = ['owner']
handler.command = /^(pesanemail)$/i
handler.private = true
handler.description = ["fake email pesan ke seseorang "]
module.exports = handler