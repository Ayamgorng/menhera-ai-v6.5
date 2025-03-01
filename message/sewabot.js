

exports.dada = (prefix, pushname, ucapanWaktu) => {
return `${ucapanWaktu} kak ${pushname}
Berikut adalah list harga untuk sewa bot

*SEWA BOT*
🌀 *Harga*
- Pengguna baru Rp. 5.000 per group -Perpanjang Rp. 3.000
- Masa aktif 7 hari

🌀 *Harga*
- Pengguna baru Rp. 10.000 per group
- Perpanjang Rp. 8.000
- Masa aktif 30 Hari

🌀 *Harga*
- Rp. 25.000 per grup
> Masa aktif 200 Hari
- Rp. 30.000 per grub
> Masa aktif 250 Hari
- Rp. 50.000 per grub
> Masa aktif satu tahun


*PREMIUM*
🌀 *User Premium*
*Harga*
- Rp. 10.000 per user
> Masa aktif 500 Hari
- Rp. 25.000 per user
> Masa aktif 1500 Hari

*Fitur Premium*
• Limit dan limit game tanpa batas
• Klaim lebih banyak EXP Harian
• Bisa membuat/mengubah watermark stiker contoh: .take aku|kamu
• Dan masih banyak lagi

𝗡𝗢𝗧𝗘 : 

Bot on 24 jam tapi kadang 
juga mati klo lgi ada error 
atau lgi perbaikan bug.

Kalo mau sewa bisa chat
owner Bot
`
}


exports.listPanel = (prefix, pushname, ucapanWaktu) => {
return Ehztext(`🎐 ${gris}「 List Harga Panel 」${gris} 🎐

${gris}📡 UNLIMITED${gris}
⤷ _Unlimited Ram/Cpu_
⤷ _Masa Aktip 1 Bulan_
⤷ _Dengan Harga 10k_

${gris}📡 1GB${gris}
⤷ _1GB Ram/50 Cpu_
⤷ _Masa Aktip 10 Hari_
⤷ _Dengan Harga 1k_

${gris}📡 2GB${gris}
⤷ _2GB Ram/70 Cpu_
⤷ _Masa Aktip 15 Hari_
⤷ _Dengan Harga 2k_

${gris}📡 3GB${gris}
⤷ _3GB Ram/100 Cpu_
⤷ _Masa Aktip 20 Hari_
⤷ _Dengan Harga 3k_

${gris}📡 4GB${gris}
⤷ _4GB Ram/125 Cpu_
⤷ _Masa Aktip 25 Hari_
⤷ _Dengan Harga 4k_

${gris}📡 5GB${gris}
⤷ _5GB Ram/150 Cpu_
⤷ _Masa Aktip 30 Hari_
⤷ _Dengan Harga 5k_

${gris}📡 6GB${gris}
⤷ _6GB Ram/175 Cpu_
⤷ _Masa Aktip 30 Hari_
⤷ _Dengan Harga 6k_

${gris}📡 7GB${gris}
⤷ _7GB Ram/175 Cpu_
⤷ _Masa Aktip 30 Hari_
⤷ _Dengan Harga 7k_

${gris}📡 8GB${gris}
⤷ _8GB Ram/200 Cpu_
⤷ _Masa Aktip 30 Hari_
⤷ _Dengan Harga 8k_

*NOTE* :
${readmore}
${gris}🎐 Keuntungan 🎐${gris}

• Ga Boros Kuota
• Server Masih Aktif Meski Anda Keluar Dari Situs
• Script Anda Aman ( no culik sc )
• Jika Situs Mati, Hubungi Admin Dengan Jaminan Uang Anda Kami Kembalikan Kembali

`)
}

const fs = require("fs");
const { color } = require("../lib/color");
const chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})




















