let handler = async (m, { q, hanz,onlyToko,onlyBadmin, isOwner, setReply }) => {
  if (!m.isGroup) return onlyToko()
  if (!m.isBotAdmin) return onlyBadmin()
  let Url = await hanz
    .groupInviteCode(m.chat)
    .catch(() => seReply(mess.error.api));
  let asu = "https://chat.whatsapp.com/" + Url;
  m.reply(asu);
};
handler.help = ["linkgc"];
handler.tags = ["admin"];
handler.command = ["linkgc"];
handler.group = true;
module.exports = handler;