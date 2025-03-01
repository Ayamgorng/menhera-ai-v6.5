let handler = async (m, { q, hanz, isOwner,onlyToko,onlyAdmin,onlyBadmin, command, setReply }) => {
  if (!m.isGroup) return onlyToko()
  if (!m.isAdmin) return onlyAdmin()
  if (!m.isBotAdmin) return onlyBadmin()
  await hanz
    .groupRevokeInvite(m.chat)
    .then((res) => {
      setReply(`Sukses menyetel tautan undangan grup ini`);
    })
    .catch(() => m.reply(mess.error.api));
};

handler.tags = ["admin"];
handler.command = ["revoke"];
handler.group = true;
handler.admin = true;
module.exports = handler;