const tfinventory = {
  others: {
    money: true,
    exp: true,
  },
  tfitems: {
    potion: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    emerald: true,
    diamond: true,
    gold: true,
    iron: true,
  },
  tfcrates: {
    common: true,
    uncommon: true,
    mythic: true,
    legendary: true,
    tbox: true,
  },
  tfpets: {
    horse: 1,
    cat: 1,
    fox: 1,
    dog: 1,
    robo: 1,
    dragon: 1,
    dino: 1,
    tano: 1,
    unicorn: 1,
  },
};
const rewards = {
  common: {
    money: 101,
    exp: 15,
    trash: 11,
    potion: [0, 1, 0, 1, 0, 0, 0, 0, 0],
    common: [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  uncommon: {
    money: 201,
    exp: 20,
    trash: 31,
    potion: [0, 1, 0, 0, 0, 0, 0],
    common: [0, 1, 0, 0, 0, 0, 0, 0],
    uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    wood: [0, 1, 0, 0, 0, 0],
    rock: [0, 1, 0, 0, 0, 0],
    string: [0, 1, 0, 0, 0, 0],
  },
  mythic: {
    money: 301,
    exp: 551,
    trash: 61,
    potion: [0, 1, 0, 0, 0, 0],
    emerald: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    diamond: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    gold: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    iron: [0, 1, 0, 0, 0, 0, 0, 0],
    common: [0, 1, 0, 0, 0, 0],
    uncommon: [0, 1, 0, 0, 0, 0, 0, 0],
    mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    wood: [0, 1, 0, 0, 0],
    rock: [0, 1, 0, 0, 0],
    string: [0, 1, 0, 0, 0],
  },
  legendary: {
    money: 401,
    exp: 601,
    trash: 101,
    potion: [0, 1, 0, 0, 0],
    emerald: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    diamond: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    gold: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    iron: [0, 1, 0, 0, 0, 0, 0],
    common: [0, 1, 0, 0],
    uncommon: [0, 1, 0, 0, 0, 0],
    mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0],
    legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    wood: [0, 1, 0, 0],
    rock: [0, 1, 0, 0],
    string: [0, 1, 0, 0],
  },
  tbox: {
    horse: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    cat: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    fox: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dog: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    robo: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dragon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    unicorn: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dino: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    tano: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ],
    cat: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
};

let handler = async (m, { hanz,command, args, prefix,usedPrefix,getRandom }) => {
  let imgr = 'https://telegra.ph/file/fddaf261642b688b054d9.jpg'
  let user = global.db.data.users[m.sender];
  const tfcrates = Object.keys(tfinventory.tfcrates)
    .map((v) => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`)
    .filter((v) => v)
    .join("\n")
    .trim();
  let listCrate = Object.fromEntries(
    Object.entries(rewards).filter(([v]) => v && v in user)
  );
  let info = `🧑🏻‍🏫 ᴜsᴇʀ: *${hanz.getName(m.sender)}*

🔖 ᴋᴏᴛᴀᴋ & ʙᴏx ʏᴀɴɢ ᴋᴀᴍᴜ ᴘᴜɴʏᴀ :
${Object.keys(tfinventory.tfcrates)
  .map((v) => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`)
  .filter((v) => v)
  .join("\n")}
–···–···–···–···–···–···–···–···–···–···–···–
❓ ᴛᴜᴛᴏʀɪᴀʟ :
⮕ ᴏᴩᴇɴ ᴄʀᴀᴛᴇ:
${prefix}open [crate] [quantity]
★ ᴇxᴀᴍᴩʟᴇ:
${prefix}open mythic 3
`.trim();
  let type = (args[0] || "").toLowerCase();
  let count =
    Math.floor(
      isNumber(args[1])
        ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER)
        : 1
    ) * 1;
  if (!(type in listCrate))
    return hanz.sendFile(
      m.chat,
      "https://pomf2.lain.la/f/3crnj4wq.jpg",
      "",
      `*ʙᴜᴋᴀ ʙᴏx & ᴄʀᴀᴛᴇ*\n` + info,
      m
    );
  if (user[type] < count)
    return m.reply(
      `
Your *${rpg.emoticon(type)}${type} crate* is not enough!, you only have ${
        user[type]
      } *${rpg.emoticon(type)}${type} crate*
type *${usedPrefix}buy ${type} ${count - user[type]}* to buy
`.trim()
    );
  // TODO: add pet crate
  // if (type !== 'pet')
  let crateReward = {};
for (let i = 0; i < count; i++) {
  for (let [reward, values] of Object.entries(listCrate[type])) {
    if (reward in user) {
      // Assuming values is an array of possible values
      if (Array.isArray(values) && values.length > 0) {
        // Select a random value from the array
        const randomIndex = Math.floor(Math.random() * values.length);
        const total = values[randomIndex];
        
        if (total) {
          user[reward] += total;
          crateReward[reward] = (crateReward[reward] || 0) + total;
        }
      }
    }
  }
}
user[type] -= count;

  m.reply(
    `
You have opened *${count}* ${global.rpg.emoticon(type)}${type} crate and got:
${Object.keys(crateReward)
  .filter(
    (v) =>
      v && crateReward[v] && !/legendary|tbox|mythic|diamond|emerald/i.test(v)
  )
  .map((reward) =>
    `
*${global.rpg.emoticon(reward)}${reward}:* ${crateReward[reward]}
`.trim()
  )
  .join("\n")}
`.trim()
  );
  let diamond = crateReward.diamond,
    mythic = crateReward.mythic,
    tbox = crateReward.tbox,
    legendary = crateReward.legendary,
    emerald = crateReward.emerald;
  if (mythic || diamond)
    m.reply(
      `
ᴋᴀᴍᴜ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ɪᴛᴇᴍ ʟᴀɴɢᴋᴀ, ʏᴀɪᴛᴜ ${
        diamond ? `*${diamond}* ${rpg.emoticon("diamond")} Diamond` : ""
      }${diamond && mythic ? " & " : ""}${
        mythic ? `*${mythic}* ${rpg.emoticon("mythic")} Mythic` : ""
      }
`.trim()
    );
  if (tbox || legendary || emerald)
    m.reply(
      `
ᴋᴀᴍᴜ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ɪᴛᴇᴍ ᴇᴘɪᴋ , ʏᴀɪᴛᴜ ${
        tbox ? `*${tbox}* ${rpg.emoticon("tbox")}tbox` : ""
      }${
        tbox && legendary && emerald
          ? ", "
          : (tbox && legendary) || (legendary && emerald) || (emerald && tbox)
          ? " "
          : ""
      }${
        legendary ? ` *${legendary}* ${rpg.emoticon("legendary")}Legendary` : ""
      }${tbox && legendary && emerald ? "and " : ""}${
        emerald ? ` *${emerald}* ${rpg.emoticon("emerald")} Emerald` : ""
      }
`.trim()
    );
};
handler.help = ["open"].map((v) => v + " [crate] [count]");
handler.tags = ["rpg"];
handler.command = /^(open|buka|gacha)$/i;
module.exports = handler;

function getRandom (ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == "number" && !isNaN(number);
}
