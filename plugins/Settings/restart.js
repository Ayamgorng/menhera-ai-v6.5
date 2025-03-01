
let handler = async (m, { text, q, hanz, isOwner, setReply }) => {
  if (!isOwner && !m.itsMe) return setReply(mess.only.owner);
  let bot = db.data.others["restart"];
  if (bot) {
    db.data.others["restart"].m = m;
    db.data.others["restart"].from = m.chat;
  } else {
    db.data.others["restart"] = {
      m: m,
      from: m.chat,
    };
  }
  await hanz.sendMessage(m.chat, { text: `_Restarting ${fake}_` });
  await hanz.sendMessage(m.chat, { text: "_Succes_" });
  await sleep(1000);
  process.send("reset");
};

handler.help = ["resest"];
handler.tags = ["check"];
handler.command = /^(reset|restart)$/i;
handler.owner = true;
module.exports = handler;