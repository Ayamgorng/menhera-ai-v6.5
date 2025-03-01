let handler = async (m, { q, hanz, isOwner, setReply }) => {
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

  if (!m.isAdmin && !isOwner) return setReply(mess.only.admin);
 // if (!m.isGroup) return setReply(mess.only.group);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (!Input) return setReply("Tag/Mention/Masukan nomer target");
  if (Input.startsWith("08")) return setReply("Awali nomor dengan 62");
  await hanz.groupParticipantsUpdate(m.chat, [Input], "add")
    .then((res) => {
      if (res[0].status == 200)
        setReply(
          `Berhasil menambahkan ${
            Input.split("@")[0]
          } ke dalam group ${groupName}`
        );
      if (res[0].status == 403)
        setReply(
          `Gagal menambahkan ${Input.split("@")[0]} ke dalam group ${groupName}`
        );
    })
    .catch((err) => setReply(jsonformat(err)));
};
handler.help = ["add"];
handler.tags = ["admin"];
handler.command = ["add"];
handler.onlyGroup = true;
module.exports =  handler;
