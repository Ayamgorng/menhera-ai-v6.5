const fs = require("fs-extra");
const canvacord = require("canvacord");
const { userLeveling } = require("../../lib/user");
const { getBuffer, getRandom } = require("../../lib/myfunc");

let handler = (m) => m;

handler.before = async function (m, { hanz, setReply, prefix }) {
  const isAutoLevelUp = m.isGroup ? db.data.chats[m.chat].autolevelup : false;

  if (isAutoLevelUp) {
    const isCmd = m.body.startsWith(prefix);
    const user = db.data.users[m.sender];

   
    if (!user) return;

    const userLevel = user.level || 0;
    const userExp = user.exp || 0;
    const amountExp = Math.floor(Math.random() * 10) + 50;
    const requiredExp = 10000 * userLevel;
    const userPersen = (userExp / requiredExp) * 100;

    
    if (isCmd && userExp >= requiredExp) {
      let link = "https://telegra.ph/file/9528a0b81d1b46bdb5507.jpg";
      let level = userLevel + 1;
      let uang = 1000 * level;

      
      db.data.users[m.sender].exp = userExp - requiredExp;
      db.data.users[m.sender].level += 1;
      db.data.users[m.sender].balance = (db.data.users[m.sender].balance || 0) + uang;

      
      let mentions = [m.sender];
      let text = `*「 LEVEL UP 」*\n\n^-^ Omedatou ${m.pushName}\nKamu telah naik level menjadi level *${userLevel} ➠ ${level}*\nBonus Balance: Rp *${uang.toLocaleString()}*\nPangkat Saat Ini: *${userLeveling(level)}*\n\n*Note:* ↓\nGunakan Balance untuk membeli limit tambahan dengan fitur ${prefix}buylimit`;

    
      let ppimg = await hanz.profilePictureUrl(m.sender, "image").catch(
        (_) =>
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
      );
      let its = await getBuffer(ppimg);
      let persenya = `${userPersen}`;

  
      let image3 = new canvacord.Rank()
        .setAvatar(its)
        .setCurrentXP(Math.floor(userExp))
        .setRequiredXP(requiredExp)
        .setStatus("online")
        .setProgressBar("#FFFFFF", "COLOR")
        .setBackground("COLOR", "#FFFACD") 
        .setCustomStatusColor("#FFD700") 
        .setUsername(`EXP: ${persenya.split(".")[0]}%,`) 
        .setLevel(userLevel)
        .setRank(4)
        .setOverlay("#FFD700") 
        .setDiscriminator("0007");

      
      let foto = await getRandom(".png");
      image3.build().then(async (data) => {
        await canvacord.write(data, foto);
        let gambar = await fs.readFileSync(foto);
        await hanz.sendMessage(
          m.chat,
          { image: gambar, caption: text, mentions },
          { quoted: m }
        );
        await fs.unlinkSync(foto);
      });
    }
  }
};

module.exports = handler;
    
        
