
const { addSaldo, minSaldo, cekSaldo } = require("../../lib/deposit");
const fs = require("fs");


let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));

let handler = async (m, { hanz, setReply }) => {
  
  let cnah = Ehztext(`*━━ CHECK YOUR INFO ━━* 

 _• *Name:* ${m.pushname}_
 _• *Nomer:* ${m.sender.split('@')[0]}_
 _• *Saldo:* Rp${toRupiah(cekSaldo(m.sender, db_saldo))}_

*Note :*
${gris}Saldo hanya bisa untuk topup
Tidak bisa ditarik atau transfer!${gris} `)
setReply(cnah)
};

handler.help = ["saldo"];
handler.tags = ["atlantic"];
handler.command = /^(saldo)$/i;
handler.cmdStore = true
handler.description = ["cek saldo "]
module.exports = handler;

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
