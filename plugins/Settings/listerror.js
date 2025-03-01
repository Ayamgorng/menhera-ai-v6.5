let handler = async (m, { text, q, conn, setReply }) => {
  let errornye = `*List Error*\nJumlah : ${db.data.listerror.length}\n\n`;
  for (let i of db.data.listerror) {
    errornye += `_*Command*_ : ${i.cmd}\n_*System Error*_ : ${i.error}\n\n*]─────────────────[*\n\n`;
  }
  errornye += `© ${fake}`;
  m.reply(errornye);
};
handler.help = ["listerror"];
handler.tags = ["check"];
handler.command = /^(listerror)$/i;
handler.owner = true;
module.exports = handler;