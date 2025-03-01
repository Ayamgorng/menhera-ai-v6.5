/*let handler = async (m, { isOwner, text,onlyOwner }) => {
  if (!isOwner) {
    return onlyOwner()
  }

  if (!text) {
    return m.reply("_Mohon masukkan kode yang akan dievaluasi._");
  }

  try {
    let evaled = await eval(text);
    if (typeof evaled !== "string") {
      evaled = require("util").inspect(evaled);
    }
    m.reply(evaled);
  } catch (err) {
    m.reply(String(err));
  }
};

handler.command = /^>/;
handler.owner = true;   
module.exports = handler;*/
