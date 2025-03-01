const { addblockcmd, deleteblockcmd, checkblockcmd } = require ("../../lib/blockcmd");
let handler = async (m, { hanz, q, setReply, isOwner, prefix }) => {
  const listcmdblock = db.data.blockcmd;
  
  if (!q)
    return setReply(
      `Textnya mana cih\n\nContoh : ${prefix}blockcmd menu\nGituuuuuuu`
    );
  if (checkblockcmd(q, listcmdblock))
    return setReply(`Command tersebut sudah ada di database`);
  addblockcmd(q, listcmdblock);
  setReply(
`Berhasil memblokir command 「 *${q}* 」\nsilakan ketik ${prefix}listblockcmd untuk melihat\ndaftar command yang telah di block`
  );
};
handler.help = ["user"];
handler.tags = ["owner"];
handler.command = ['blockcmd']
handler.owner = true;

module.exports = handler;