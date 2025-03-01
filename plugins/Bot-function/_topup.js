

const fetch = require('node-fetch');
const QRCode = require('qrcode');
const fs = require("fs")
const { color } = require('../../lib/color')
// ======== STORE & TOP UP ======= //
function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

let handler = (m) => m;

handler.before = async function (m, { hanz,isGroup,reply }) {

const { addSaldo, minSaldo, cekSaldo } = require("../../lib/deposit");
let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
let depositPath = "./database/deposit/"
let topupPath = "./database/topup/"
const toJSON = j => JSON.stringify(j, null,'\t')
const sender = m.sender
const chatPrivate = !m.isGroup ? m.body.trim().toLowerCase() : null;
    

    
if (chatPrivate === "payment_ovo") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "OVO",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke banh mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
} else if (chatPrivate === "payqris") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "QRIS",
data: {
iddepo: "",
qr: "",
amount_deposit: "",
nominal: "",
pajak: "",
exp: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply(`🎉 *Oke, Kak!* 🎉

Berapa jumlah deposit yang ingin Anda lakukan?  
Silakan masukkan nominalnya dalam format angka.  
Contoh: *15000*`);

} else {
reply(`⚠️ *PERHATIAN* ⚠️

Proses deposit Anda masih ada yang belum terselesaikan.  
Untuk melanjutkan, Anda dapat mengetik *Batal* untuk membatalkan transaksi.`);
}

} else if (chatPrivate === "paydana") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "DANA",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke banh mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!m.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "amount") {
if (isNaN(m.body.trim().toLowerCase())) return reply(`⚠️ *PERHATIAN* ⚠️

Harap masukkan *angka terlebih dahulu* untuk memproses transaksi.  
Setelah itu, Anda dapat melanjutkan atau membatalkan proses sesuai kebutuhan.`)


data_deposit.data.amount_deposit = Number(m.body.trim().toLowerCase())
if (data_deposit.data.amount_deposit < 2000) return reply(`Transaksi Deposit Minimal Rp2000`)
if (data_deposit.data.amount_deposit > 5000000) return reply(`Nominal Deposit terlalu tinggi`)
data_deposit.session = "konfirmasi_deposit";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
if (data_deposit.payment === "QRIS") {
	let pajakny = await toJSON(0.01 * data_deposit.data.amount_deposit)
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("reff_id", data_deposit.ID);
key.append("nominal", data_deposit.data.amount_deposit+Number(pajakny));
key.append("type", "ewallet")
key.append("metode", "qrisfast")
fetch("https://atlantich2h.com/deposit/create", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
	QRCode.toFile("./depoqris.jpg", res.data.qr_string, { margin: 2, scale: 10 })
if (!res.status) return reply(res.message)
data_deposit.result = res.status
data_deposit.data.iddepo = res.data.id
data_deposit.data.qr = "./depoqris.jpg"
data_deposit.data.pajak = res.data.nominal - data_deposit.data.amount_deposit
data_deposit.data.nominal = res.data.nominal
data_deposit.data.exp = res.data.expired_at
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
hanz.sendMessage(m.chat, { 
  text: `╭─❑ *「 KONFIRMASI DEPOSIT 」* ❑─╮
│  
├ 🆔 *ID Transaksi:* ${data_deposit.ID}  
├ 📞 *Nomor Pengguna:* ${data_deposit.number.split('@')[0]}  
├ 💳 *Metode Pembayaran:* ${data_deposit.payment}  
├ 💵 *Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}  
├ 💸 *Pajak Admin:* Rp${toRupiah(res.data.nominal - data_deposit.data.amount_deposit)}  
├ 💰 *Total Pembayaran:* Rp${toRupiah(res.data.nominal)}  
│  
╰─❑ *MOHON KONFIRMASI* ❑─╯  

📌 _Ketik *lanjut* untuk melanjutkan transaksi._  
📴 _Ketik *batal* untuk membatalkan transaksi._`, 
}, { quoted: m });

})
} else {
hanz.sendMessage(m.chat, { 
  text: `╭─❑ *「 KONFIRMASI DEPOSIT 」* ❑─╮
│  
├ 🆔 *ID Transaksi:* ${data_deposit.ID}  
├ 📞 *Nomor Pengguna:* ${data_deposit.number.split('@')[0]}  
├ 💳 *Metode Pembayaran:* E-Wallet  
├ 💵 *Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}  
├ 💸 *Pajak Admin:* Rp0  
├ 💰 *Total Pembayaran:* Rp${toRupiah(data_deposit.data.amount_deposit)}  
│  
╰─❑ *MOHON KONFIRMASI* ❑─╯  

📌 _Ketik *Lanjut* untuk melanjutkan transaksi._  
📴 _Ketik *Batal* untuk membatalkan transaksi._`, 
}, { quoted: m });

}
} else if (data_deposit.session === "konfirmasi_deposit") {
if (chatPrivate === "lanjut") {
 if (data_deposit.payment === "QRIS") {
var qr_fexf = `╭─❑ *「 PEMBAYARAN VIA QRIS 」* ❑─╮
│  
├ 🆔 *ID Pengguna:* ${data_deposit.ID}  
├ 📞 *Nomor Pengguna:* ${data_deposit.number.split("@")[0]}  
├ 💵 *Jumlah Deposit:* Rp ${toRupiah(data_deposit.data.amount_deposit)}  
├ 💸 *Pajak Admin:* Rp ${toRupiah(data_deposit.data.pajak)}  
├ 💰 *Total Pembayaran:* Rp ${toRupiah(data_deposit.data.nominal)}  
├ ⏳ *Batas Waktu Pembayaran:* ${data_deposit.data.exp}  
│  
╰─❑ *TERIMA KASIH* ❑─╯  

📌 _Silakan scan QRIS di atas untuk melanjutkan pembayaran._  
📴 _Ketik *batal* jika ingin membatalkan transaksi._`;

hanz.sendMessage(m.chat, { image: fs.readFileSync(data_deposit.data.qr), caption: qr_fexf }, { quoted: m })
} else if (data_deposit.payment === "DANA") {
var py_dana = Ehztext(`⭒━━━━━━[ *PAYMENT OPTIONS* ]━━━━━━⭒

🟢 *DANA*
 • Nomor: ${payment.dana.nomer}
 • Atas Nama: ${payment.dana.atas_nama}

🔵 *GOPAY*
 • Nomor: Tidak Tersedia Untuk Saat Ini
 • Atas Nama: 

🟠 *SHOPEEPAY*
 • Nomor: Tidak Tersedia Untuk Saat Ini
 • Atas Nama: 

🟣 *OVO*
 • Nomor: Tidak Tersedia Untuk Saat Ini
 • Atas Nama: 

🔵 *MANDIRI*
 • Nomor: Tidak Tersedia
 • Atas Nama: Tidak Tersedia

Harap transfer sesuai nomor di atas, dan setelah pembayaran, kirim bukti transfer dengan caption *.bukti* untuk diproses oleh admin. Terima kasih! 🙏`);

reply(py_dana)
}} else if (chatPrivate === "batal") {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_deposit.data.iddepo);
fetch("https://atlantich2h.com/deposit/cancel", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
reply(`Baik kak, deposit dengan ID: ${data_deposit.ID} dibatalkan`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
})
}}}}


if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.payment === "QRIS") {
var intervals = setInterval(function() {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_deposit.data.iddepo);
fetch("https://atlantich2h.com/deposit/status", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
console.log(res); // For Debugging
console.log(color("[DEPOSIT QRIS]", "green"), `-> ${sender}`) // For Debugging
if (res.status == false) {
	clearInterval(intervals);
} else if (res.data.status === "success") {
reply(`╭───❑ *DEPOSIT BERHASIL* ❑───
│  
├ ✨ *Status:* Berhasil ✅  
├ 💳 *ID Transaksi:* ${data_deposit.ID}  
├ 📱 *Nomor:* ${data_deposit.number.split("@")[0]}  
├ 💵 *Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}  
├ 🏦 *Pajak Admin:* Rp${toRupiah(data_deposit.data.pajak)}  
├ 💰 *Total Pembayaran:* Rp${toRupiah(data_deposit.data.nominal)}  
│  
╰───❑ *TERIMA KASIH!* ❑───  
🤝 _Kami menghargai kepercayaan Anda. Semoga layanan kami memuaskan._`);

addSaldo(sender, Number(data_deposit.data.amount_deposit), db_saldo)
fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (res.data.status === "expired") {
console.log(res)
reply(`Deposit anda telah *Expired*`)
fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (res.data.status === "cancel") {
if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) return fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
}
})
}, 3000)
}
}


if (fs.existsSync(topupPath + sender.split("@")[0] + ".json")) {
	if (!m.key.fromMe) {
let data_topup = JSON.parse(fs.readFileSync(topupPath + sender.split("@")[0] + ".json"))
if (data_topup.session === "target") {
if (isNaN(m.body.trim().toLowerCase())) return reply("Hanya Masukan Nomor/Id Tidak boleh ada karakter lain")
data_topup.data.target = m.body.trim().toLowerCase()
data_topup.session = "konfirmasi_topup";
fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));

let tekYa = `🎯 *TARGET:* ${data_topup.data.target}

_Pastikan ID atau Nomor yang Anda masukkan sudah benar._

Ketik *lanjut* untuk melanjutkan transaksi, atau ketik *batal* jika ingin membatalkan.`;

reply(tekYa)
} else if (data_topup.session === "konfirmasi_topup") {
	if (chatPrivate === "lanjut") {
	let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("code", data_topup.data.code)
key.append("reff_id", require("crypto").randomBytes(5).toString("hex").toUpperCase())
key.append("target", data_topup.data.target)
fetch("https://atlantich2h.com/transaksi/create", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
	if (!res.status) return reply('Server maintenance\nHarap Ketik *batal* Terlebih Dahulu,Lalu Gunakan Pilihan Yang Lain')
	let persen = (untung / 100) * res.data.price
	data_topup.result = res.status
	data_topup.data.idtopup = res.data.id
	data_topup.data.id = res.data.reff_id
	data_topup.data.price = res.data.price + Number(Math.ceil(persen))
	data_topup.data.layanan =  res.data.layanan
	fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));
	reply(`*「 ${res.message.toUpperCase()} 」*\n\n*PESAN:* _Tunggu sejenak, Bot sedang memproses pesanan anda✅_`)	
})
await sleep(5000)
var intervals = setInterval(function() {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_topup.data.idtopup)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/transaksi/status", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(responsep => responsep.json())
.then(resss => {
console.log(resss); // For Debugging
console.log(color("[TRANSAKSI]", "green"), `-> ${sender}`) // For Debugging
if (resss.status == false) {
	clearInterval(intervals);
	} else
if (resss.data.status === "success") {
	let persen = (untung / 100) * resss.data.price
reply(`╭───❑ *「 TOPUP BERHASIL 」* ❑───  
│  
├ ✅ *Status:* Berhasil  
├ 🆔 *ID Pesanan:* ${resss.data.reff_id}  
├ 🛠️ *Layanan:* ${resss.data.layanan}  
├ 📞 *Nomor Tujuan:* ${resss.data.target}  
├ 💰 *Harga:* Rp${toRupiah(Number(resss.data.price) + Number(Math.ceil(persen)))}  
│  
├ 🔢 *Serial Number (SN):*  
│ ${resss.data.sn}  
│  
╰───❑ *TERIMA KASIH!* ❑───  
🙏 _Terima kasih telah memesan. Semoga transaksi ini memuaskan dan layanan kami bermanfaat._`);


minSaldo(sender, (Number(resss.data.price) + Number(Math.ceil(persen))), db_saldo)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (resss.data.status === 'failed') {
console.log(resss)
reply(`❌Pesanan dibatalkan!\nAlasan : Kesalahan oleh bot atau ID tidak valid`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (resss.data.status === 'cansel') {
console.log(resss)
reply(`❌Pesanan dibatalkan!\nAlasan : ${resss.data.message}`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} 
})
}, 3000)
	} else if (chatPrivate === "batal") {
		reply(`Pesanan dibatalkan!`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
	}}}}
};
module.exports = handler;
