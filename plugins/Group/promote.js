let handler = async (m, { q, hanz,onlyAdmin,onlyBadmin, isOwner,onlyToko, command, setReply }) => {
  if (!m.users) return setReply("reply/tag targetnya");
  if (!m.isAdmin && !isOwner) return onlyAdmin()
  if (!m.isGroup) return onlyToko()
  if (!m.isBotAdmin) return onlyBadmin()
  await hanz.groupParticipantsUpdate(m.chat, [m.users], "promote")
    .then((res) => setReply(`Sukses Promote ${m.users}`))
    .catch((err) => setReply(jsonformat(err)));
};

handler.tags = ["admin"];
handler.command = ["promote"];
handler.group = true;

module.exports = handler;
