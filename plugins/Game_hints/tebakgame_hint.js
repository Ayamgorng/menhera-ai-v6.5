let handler = async (m, { hanz }) => {
  hanz.game = hanz.game ? hanz.game : {};
  let id = "tebakgame-" + m.chat;
  if (!(id in hanz.game)) return;
  let json = hanz.game[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_"
  );
};
handler.command = /^(hgame)$/i;
handler.limit = true;
module.exports = handler;