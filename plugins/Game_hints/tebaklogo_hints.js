let handler = async (m, { hanz }) => {
    hanz.tebaklogo = hanz.tebaklogo ? hanz.tebaklogo : {}
    let id = m.chat
    if (!(id in hanz.tebaklogo)) throw false
    let json = hanz.tebaklogo[id][1]
    hanz.reply(m.chat, '```' + json.hasil.data.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hlog$/i

handler.limit = true

module.exports = handler;