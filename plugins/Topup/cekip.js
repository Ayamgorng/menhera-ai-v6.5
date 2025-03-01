const fetch = require('node-fetch');

let handler = async (m, { hanz,reply }) => {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
fetch("https://atlantich2h.com/get_profile", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) return reply('Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider')
reply('IP sudah tersambung ke server.')
})
}
handler.help = ["cekip"];
handler.tags = ["atlantic"];
handler.command = /^(cekip)$/i;
handler.owner = true
handler.private = true

module.exports = handler;