const { badword } = require('../../message/messages');
const { addBadword, delBadword, isKasar, addCountKasar, isCountKasar, delCountKasar } = require("../../lib/badword.js");

let handler = (m) => m;

handler.before = async function (m, { hanz, isOwner }) {
  const _toxic =  db.data.toxic 
  // ANTI BADWORD
  if (m.isGroup ){ 
if (badword.includes(m.budy)) {
if (isCountKasar(m.sender, _toxic)){
if (!m.isBotAdmin) return m.reply(`Kamu beruntung karena bot bukan admin`)
m.reply(`Sepertinya kamu sudah berkata kasar lebih dari 5x maaf kamu akan di kick`)
m.reply('Hitungan mundur dalam waktu')
await sleep(1000)
hanz.sendMessage(m.chat, { id: m.key.id, contextInfo: { forwardingScore: 50, isForwarded: true },showAdAttribution: true, text: `3` })
await sleep(2000)
hanz.sendMessage(m.chat, { id: m.key.id, contextInfo: { forwardingScore: 50, isForwarded: true },showAdAttribution: true, text: `2` })
await sleep(3000)
hanz.sendMessage(m.chat, { id: m.key.id, contextInfo: { forwardingScore: 50, isForwarded: true },showAdAttribution: true, text: `1` })
await sleep(4500)
hanz.sendMessage(m.chat, { id: m.key.id, contextInfo: { forwardingScore: 50, isForwarded: true },showAdAttribution: true, text: `Sayonaraa 👋` })
hanz.groupParticipantsUpdate(m.chat, [m.sender], 'remove').catch((e) => { m.reply(`Bakaa aku bukan admin gimana mau kick`) })
delCountKasar(m.sender, _toxic)
} else {
addCountKasar(m.sender, _toxic)
m.reply(`Kamu terdeteksi berkata kasar! jangan ulangi lagi atau kamu akan dikick oleh bot`)
}
}
}
};

module.exports = handler;

// Fungsi sleep (delay dalam ms)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
