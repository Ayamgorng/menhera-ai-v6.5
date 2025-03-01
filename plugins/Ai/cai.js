const axios = require("axios");

const handler = async (m, { text, hanz }) => {
  
  if (!text) return m.reply("naon kang?");
  
  
  var user = db.data.users[m.sender];
  if (!user.game) user.game = {};
  if (!user.game.cai) user.game.cai = { sessionId: false };

  try {
    await m.reply("*waitt*");

    
    const response = (await axios.post(
      "https://skizoasia.xyz/api/cai/chat?apikey=Rangelofficial",
      {
        text,
        token: "d70ddabf295dd37c6e9054144da4cbd9f036d11d",
        characterId: "4-2A50h_gPhaTEaK3H8TzkZaORKN5MSJEPqnNgBzcZA", // Karakter Hutao
        ...(user.game.cai.sessionId ? { sessionId: user.game.cai.sessionId } : {}),
      }
    )).data;


    if (!response.success) return m.reply("Terjadi kesalahan: " + response.message);

 
    user.game.cai.sessionId = response.result.sessionId;

  
    await hanz.sendMessage(m.chat, { text: response.result.text }, { quoted: m });
  } catch (error) {
    console.error(error);
    m.reply("Oops, terjadi kesalahan. " + error);
  }
};


handler.command = ["cai"];
module.exports = handler;
