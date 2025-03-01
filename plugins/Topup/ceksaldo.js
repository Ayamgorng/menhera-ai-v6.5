const fetch = require('node-fetch');

let handler = async (m, { hanz, reply,setReply }) => {

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
setReply(`*ATLANTIC PEDIA PROFILE*\n*Name:* ${res.data.name}\n*Username:* ${res.data.username}\n*Email:* ${res.data.email}\n*Sisa Saldo:* Rp${toRupiah(res.data.balance)}`)
})
}

handler.help = ["ceksaldo"];
handler.tags = ["topup"];
handler.command = /^(ceksaldo)$/i;
handler.cmdStore = true
handler.description = ["cek saldo atlantic"]

module.exports = handler;

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}