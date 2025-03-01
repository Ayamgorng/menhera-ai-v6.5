const rewards = {
  exp: 9999,
  money: 4999,
  potion: 5,
};
const cooldown = 79200000; // 22 hours in milliseconds

let handler = async (m, { usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  
  // Check if user exists
  if (!user) {
    return m.reply("User data not found.");
  }
  
  let imgr = "https://telegra.ph/file/6fbd28208a0705cfa8eca.jpg";
  
  // Check if the user has claimed rewards recently
  if (Date.now() - user.lastclaim < cooldown) {
    const timeLeft = new Date(user.lastclaim + cooldown - Date.now());
    return m.reply(
      `ʏᴏᴜ'ᴠᴇ ᴀʟʀᴇᴀᴅʏ ᴄʟᴀɪᴍᴇᴅ *ᴛᴏᴅᴀʏ ʀᴇᴡᴀʀᴅs*, ᴩʟᴇᴀsᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ғɪɴɪsʜ.\n\n⏱️ ${timeLeft.toISOString().substr(11, 8)}`
    );
  }
  
  // Add rewards to the user's data
  let text = "";
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) {
      user[reward] = 0; // Initialize the user's reward if not present
    }
    user[reward] += rewards[reward];
    text += `➠ ${global.rpg.emoticon(reward)} ${reward}: ${rewards[reward]}\n`;
  }
  
  // Send confirmation message
  m.reply(
    `🔖 ᴅᴀɪʟʏ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :\n${text}`
  );
  
  // Update the last claim time
  user.lastclaim = Date.now();
};

handler.help = ["daily", "claim"];
handler.tags = ["xp"];
handler.command = /^(ambil|daily)$/i;

handler.register = true;
handler.group = true;
handler.rpg = true;

module.exports = handler;

