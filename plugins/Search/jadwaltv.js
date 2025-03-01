let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply('_Mohon Tunggu Sebentar_')
  let res = await AcaraNow()
  let hasil = res.map(item => `${item}`
).join("\n");
  m.reply('*ACARA TV INDONESIA*\n' + hasil)
}
handler.help = ["acaranow"]
handler.tags = ["internet"]
handler.command = ["jadwaltv"]
module.exports = handler

    let cheerio = require('cheerio')
    let axios = require('axios')
    function AcaraNow() {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get('https://www.jadwaltv.net/channel/acara-tv-nasional-saat-ini');
            const $ = cheerio.load(data)
            let tv = []
            $('table.table.table-bordered > tbody > tr').each((u, i) => {
                let an = $(i).text().split('WIB')
                if (an[0] === 'JamAcara') return
                if (typeof an[1] === 'undefined') return tv.push('\n' + '*' + an[0] + '*')
                tv.push(`${an[0]} - ${an[1]}`)
            })
            if (tv.every(x => x === undefined)) return resolve({
                developer: '@xorizn',
                mess: 'no result found'
            })
            resolve(tv)
        } catch (err) {
            console.error(err)
        }
    })
}