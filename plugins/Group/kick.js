let handler = async (m, { q, hanz, isOwner,onlyAdmin,onlyToko,onlyBadmin, setReply }) => {
  const jsonformat = (string) => {
    return JSON.stringify(string, null, 2);
  };
  const numberQuery =
    q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`;
  const Input = m.mentionByTag[0]
    ? m.mentionByTag[0]
    : m.mentionByReply
    ? m.mentionByReply
    : q
    ? numberQuery
    : false;

  if (!m.isAdmin && !isOwner) return onlyAdmin()
  if (!m.isGroup) return onlyToko()
  if (!m.isBotAdmin) return onlyBadmin()
  if (!Input) return setReply("Tag/Mention/Masukan nomer target");
  if (Input.startsWith("08")) return setReply("Awali nomor dengan 62");
  if (Input == m.botNumber)
    return setReply("Gunakan fitur out untuk mengeluarkan bot");

  await hanz
    .groupParticipantsUpdate(m.chat, [Input], "remove")
    .then((res) =>
      setReply(
        `Berhasil mengeluarkan  ${
          Input.split("@")[0]
        } ke dalam group ${groupName}`
      )
    )
    .catch((err) => setReply(jsonformat(err)));
};
handler.help = ["kick"];
handler.tags = ["admin"];
handler.command = ["kick"];
handler.group = true;
module.exports = handler;