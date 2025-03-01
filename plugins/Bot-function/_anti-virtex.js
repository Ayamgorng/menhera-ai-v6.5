let handler = (m) => m;
handler.before = async function (m, { hanz, isOwner ,setReply}) {
  const isAntiVirtex = m.isGroup ? db.data.chats[m.chat].antivirtex : false;
  if (m.isGroup && isAntiVirtex && m.budy.length > 20000) {
    if (m.isAdmin) return setReply("*VIRTEX DETECTED*");
    console.log(
      color("[KICK]", "red"),
      color("Received a virus text!", "yellow")
    );
    //await conn.sendMessage(from, {text:antivirus(pushname,groupName)})
    if (!m.isBotAdmin) {
      return;
    }
    if (isOwner) {
      return;
    }
    await hanz.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    await sleep(2000);
    await hanz.sendMessage(`${nomerOwner}@s.whatsapp.net`, {
      text: `Hai Owner! wa.me/${
        m.sender.split("@")[0]
      } Terdeteksi Telah Mengirim Virtex ${
        m.isGroup ? `di Group ${m.groupName}` : ""
      }`,
    });
  }
};
module.exports = handler;
