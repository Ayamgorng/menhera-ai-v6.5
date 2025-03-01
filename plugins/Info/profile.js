const fs = require("fs");
const ms = require("parse-ms");

const canvacord = require("canvacord");
const { checkDataName, createDataId, removeDataId, checkDataId, addDataId } = require("../../lib/totalcmd");
const { getBuffer, getRandom } = require("../../lib/myfunc");

const { userLeveling, userXp } = require("../../lib/user");

let handler = async (m, { hanz, isPremium }) => {
  try {
    const DataId = db.data.data;

    let sender = m.sender;
    let ppimg = await hanz.profilePictureUrl(sender, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60');
    try {
      let sol = await hanz.fetchStatus(sender);
      var stst = sol.status == undefined ? '' : sol.status;
    } catch (err) {
      var stst = "";
    }

    const isOwner = ownerNumber.includes(sender) || checkDataId("owner", sender, DataId);

    const gcount = isPremium ? gcounti.prem : gcounti.user;
    const userLevel = sender ? db.data.users[m.sender].level : true;
    const userExp = sender ? db.data.users[m.sender].exp : true;
    const userId = sender ? db.data.users[m.sender].id : true;
    const amountExp = Math.floor(Math.random() * 10) + 50;
    const requiredExp = 10000 * userLevel;
    const userPersen = userExp / requiredExp * 100;
    const userVerified = sender ? db.data.users[m.sender].date : true;

    let user = global.db.data.users[sender];
    if (!user) {
      return hanz.reply(m.chat, '⚠️ Data pengguna tidak ditemukan!', m);
    }

    let persenya = `${userPersen}`;
    let nana = `${userExp}/${requiredExp}`;
    let cekvip = ms(user.premiumTime - Date.now());
    let premiumnya = `${cekvip.days} hari ${cekvip.hours} jam ${cekvip.minutes} menit ${cekvip.seconds}`;
    let prmm = isPremium ? (isOwner ? 'Premium' : user ? premiumnya : '') : 'Not Premium';
    let pasangan = user.pasangan ? `💞 ${user.pasangan}` : "Tidak ada";
    let ultah = user.ultah ? `🎂 ${user.ultah}` : "Tidak terdaftar";

    let teks = `*]────「 Profile User 」────[*

    🆔 Nama : ${m.pushname} 
    📧 Email : ${user.email || 'tidak ada'}
	💳 Saldo  : Rp ${db.data.users[sender].balance.toLocaleString()}
	✅ Verified : ${userVerified}
	📇 Status :  ${isPremium ? 'Premium':'Free'}
	🧬 Level : ${userLevel}
	🔰 Grade : ${userLeveling(`${db.data.users[sender].level}`)}
	⚡ Exp :  ${userXp(userPersen)} ${persenya.split(".")[0]}%
	♻️ Total Exp : ${nana}
	📟 User Hit : ${db.data.users[sender].hit}
	🤖 Status Bot : ${isOwner ? 'Owner':'User'}
	🕔 Expired : ${prmm}
	📉 Limit : ${isPremium ? 'Unlimited' : `${db.data.users[sender].limit}/${limitCount}`}
	📈 Limit Game : ${isPremium ? 'Unlimited' : `${db.data.users[sender].glimit}/${gcounti.user}`}
	📲 No : wa.me/${sender.split("@")[0]}
	🧸 Bio : ${stst}
	💑 Pasangan : ${pasangan}
	🎂 Ulang Tahun : ${ultah}`;

    let rankCard = new canvacord.Rank()
      .setAvatar(ppimg)
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
    rankCard.build().then(async data => {
      await canvacord.write(data, foto);
      let gambar = await fs.readFileSync(foto);
      hanz.sendMessage(m.chat, { caption: teks, image: gambar }, { quoted: m });
      await fs.unlinkSync(foto);
    });
  } catch (err) {
    console.error(err);
    
  }
};

handler.help = ['me', 'profil'];
handler.tags = ['tools'];
handler.command = /^(me|profil)$/i;
handler.noCmdStore = true;
handler.onlyGroup = true;
module.exports = handler;