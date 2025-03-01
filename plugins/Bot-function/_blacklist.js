let handler = (m) => m;

handler.before = async function (m, { hanz,prefix }) {
  const db = global.db.data;
  const chat = db.chats[m.chat];
let usernya = `${m.sender}`
if (m.isGroup) {
   
  if (chat.blacklist.includes(usernya)) {
    try {
      await hanz.sendMessage(m.chat, { delete: { 
        remoteJid: m.chat, 
        fromMe: false, 
        id: m.key.id, 
        participant: m.key.participant || m.participant  } });
      // Kirim pesan pemberitahuan (opsional)
       m.reply('© *User Blacklist*.');
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  }}
};
module.exports = handler;
