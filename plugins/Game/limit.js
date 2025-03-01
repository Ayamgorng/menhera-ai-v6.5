let handler = async (m, { hanz, prefix,command,setReply,isPremium,sendAnti }) => {
  try {
    let target = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted && m.quoted.sender 
      ? m.quoted.sender 
      : m.sender;

    // Ambil data pengguna
    let user = global.db.data.users[target];
    if (!user) {
      return hanz.reply(m.chat, "⚠️ Pengguna belum terdaftar di database bot.", m);
    }
const gcount = isPremium ? gcounti.prem : gcounti.user
  let prefix = ".";
  let name = m.mentionByReply
    ? await hanz.getName(m.mentionByReply)
    : m.pushname;
  let number = m.mentionByReply
    ? m.mentionByReply.split("@")[0]
    : m.senderNumber;
  let limid = m.mentionByReply
    ? db.data.users[m.mentionByReply].premiumTime !== 0
      ? "Unlimited"
      : `${db.data.users[m.mentionByReply].limit}/${limitCount}`
    : isPremium
    ? "Unlimited"
    : `${db.data.users[m.sender].limit}/${limitCount}`;
  let gemlimit = m.mentionByReply
    ? `${db.data.users[m.mentionByReply].glimit}/${gcount}`
    : `${db.data.users[m.sender].glimit}/${gcount}`;
  let uang = m.mentionByReply
    ? db.data.users[m.mentionByReply].balance.toLocaleString()
    : db.data.users[m.sender].balance.toLocaleString();
  

    // Balasan
    let replyText = Ehztext(`
*🔖 Info 🔖*
👤 *Nama* : ${await hanz.getName(target)}
📊 *Limit*: ${limid} ⚡
🎮 *Limit Game*: ${gemlimit} 🎲
💰 *Balance*: Rp ${uang}\n
⚠️ *Tips*: Kamu dapat Menukarkan Balance Untuk Membeli Limit:
   - *${prefix}buylimit* untuk membeli limit
   - *${prefix}buyglimit* untuk membeli game limit
Atau ketik *${prefix}buyprem* untuk membeli unlimited limit 💎
    `);
sendAnti(replyText)
    //hanz.reply(m.chat, replyText.trim(), m);
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, "❌ Terjadi kesalahan saat memproses data.", m);
  }
};

handler.help = ['limit', 'ceklimit'];
handler.tags = ['info'];
handler.command = /^(limit|ceklimit)$/i;
handler.noCmdStore = true
handler.onlyGroup = true
module.exports = handler;
