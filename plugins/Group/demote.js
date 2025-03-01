let handler = async (m, { q, hanz, isOwner,onlyAdmin,onlyBadmin,onlyToko, command, setReply }) => {
    if (!m.users) return setReply("reply/tag targetnya");
    if (!m.isAdmin && !isOwner) return onlyAdmin()
    if (!m.isGroup) return onlyToko()
    if (!m.isBotAdmin) return onlyBadmin()
    await hanz
      .groupParticipantsUpdate(m.chat, [m.users], "demote")
      .then((res) => setReply(`Sukses Demote ${m.users}`))
      .catch((err) => setReply(jsonformat(err)));
  };
  
  handler.tags = ["admin"];
  handler.command = ["unadmin","demote"];
  handler.onlyGroup = true;
 
  module.exports = handler;