const { addblockcmd, deleteblockcmd, checkblockcmd } = require ("../../lib/blockcmd");
let handler = async (m, { conn, q, setReply, isOwner, prefix }) => {
  const listcmdblock = db.data.blockcmd;

  try {

    if (!q) return setReply("Textnya mana cih");
    if (!checkblockcmd(q, listcmdblock))
      return setReply(`Command tersebut tidak ada di database`);
    deleteblockcmd(q, listcmdblock);
    setReply(`Berhasil unblock command 「 *${q}* 」`);
  } catch (err) {
    setReply("Bjirr error, keknya ada yang error");
  }
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ["unblockcmd"];
handler.owner = true;

module.exports = handler;