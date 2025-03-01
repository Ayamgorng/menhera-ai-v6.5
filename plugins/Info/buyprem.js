


let handler = async (m, { hanz, command,setReply }) => {

let anu = `🌟 𝗨𝗦𝗘𝗥 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 🌟

✨  *𝘽𝙪𝙮 𝙋𝙧𝙚𝙢𝙞𝙪𝙢*  ✨
╭──────────
├ 📌 *Harga Khusus!*
│   • Pengguna Baru: Rp 10k 
│     Masa Aktif: 500 Hari
│   • Premium Ekstra: Rp 25k 
│     Masa Aktif: 1500 Hari
╰──────────

🔓  *𝗙𝗶𝘁𝘂𝗿 𝗣𝗿𝗲𝗺𝗶𝘂𝗺*  🔓
╭──────────
├ ➤  Limit Tanpa Batas 🚀
├ ➤  Klaim EXP Harian Lebih Banyak
├ ➤  Semua Fitur Premium Terbuka 🔥
├ ➤  Akses Fitur NSFW 🛑
├ ➤  Kustomisasi Watermark Stiker ✍️
├ ➤  Dan masih banyak lagi! 🎉
╰──────────

📌 *𝗡𝗢𝗧𝗘* 📌

Fitur premium ini menghadirkan akses tanpa batas dan pengalaman eksklusif untuk Anda. Segera manfaatkan kesempatan untuk menjadi pengguna premium dengan limit yang tidak terbatas dan berbagai keistimewaan lainnya!

Jika tertarik, hubungi owner di sini: ${nomerOwner}
`
setReply(anu)
    }
handler.command = /^(buyprem|buypremium)$/i
handler.tags = ['main']
handler.help = ['premium']


module.exports = handler
