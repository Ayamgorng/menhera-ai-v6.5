let handler = async (m, { q, hanz,onlyToko,onlyBadmin, isOwner, setReply }) => {
  try {
    if (!m.isGroup) return onlyToko()
    if (!m.isBotAdmin) return onlyBadmin()
    await hanz.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    await setReply("Done wkwkw");
  } catch (err) {
    setReply(`${err}`);
  }
};
handler.help = ["kickme"];
handler.tags = ["admin"];
handler.command = ["kickme"];
handler.group = true;
module.exports = handler;