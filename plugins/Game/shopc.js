let handler = async (m, { hanz,prefix,setReply }) => {
    let teks = Ehztext(`
    *🛒────「 SHOP 」────🛒*
 Halo, ${m.pushname} 👋
💰 *Saldo Kamu*: Rp ${db.data.users[m.sender].balance.toLocaleString()}

📋 *List Harga*:
1️⃣ *1 Limit*: Rp 1,000
2️⃣ *1 Limit Game*: Rp 700

📝 *Cara Pembelian*:
- Untuk membeli *Limit*, ketik: 
${prefix}buylimit [jumlah limit]
_Contoh_: ${prefix}buylimit 10
- Untuk membeli *Limit Game*, ketik:
${prefix}buyglimit [jumlah limit game]
_Contoh_: ${prefix}buyglimit 10

⚡ *Atau ketik* .buyprem untuk membeli *Unlimited Limit* 💎
    `);
  setReply(teks);
}
handler.help = ["shopc"];
    handler.tags = ["game"];
    handler.command = ["shopc"];
handler.noCmdStore = true
handler.onlyGroup = true
    module.exports = handler;