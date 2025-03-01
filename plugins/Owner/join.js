let handler = async (m, { text, q, hanz, setReply,command, isOwner,onlyOwner }) => {
  if (!isOwner) return onlyOwner()
  let link = q.startsWith("http");
  if (!link) return setReply(`Kirim perintah ${command} _linkgrup_`);
  let ano = q.split("https://chat.whatsapp.com/")[1];
  await hanz.groupAcceptInvite(ano);
  setReply("Sukses join group");
};

handler.command = ["join"];
handler.owner = true;
module.exports = handler;