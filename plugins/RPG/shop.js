const fs = require("fs");

const items = {
  buy: {
    limit: { money: 100000 },
    chip: { money: 1000000 },
    kondom: { money: 50000 },
    exp: { money: 1000 },
    potion: { money: 1250 },
    trash: { money: 40 },
    wood: { money: 700 },
    coal: { money: 500 },
    rock: { money: 850 },
    string: { money: 400 },
    iron: { money: 3000 },
    diamond: { money: 300000 },
    emerald: { money: 250000 },
    gold: { money: 150000 },
    common: { money: 12000 },
    uncommon: { money: 120000 },
    mythic: { money: 175000 },
    legendary: { money: 300000 },
    petfood: { money: 35000 },
    pet: { money: 120000 },
    anggur: { money: 2000 },
    apel: { money: 2000 },
    jeruk: { money: 2000 },
    mangga: { money: 2000 },
    pisang: { money: 2000 },
    bibitanggur: { money: 2000 },
    bibitapel: { money: 2000 },
    bibitjeruk: { money: 2000 },
    bibitmangga: { money: 2000 },
    bibitpisang: { money: 2000 },
    umpan: { money: 5000 },
    limit: { money: 2500 },
  },
  sell: {
    tbox: { money: 45000000 },
    exp: { money: 1 },
    chip: { money: 1000000 },
    potion: { money: 625 },
    trash: { money: 20 },
    wood: { money: 350 },
    rock: { money: 425 },
    string: { money: 200 },
    iron: { money: 1500 },
    diamond: { money: 250000 },
    emerald: { money: 150000 },
    gold: { money: 150000 },
    common: { money: 1000 },
    uncommon: { money: 10000 },
    mythic: { money: 37500 },
    legendary: { money: 100000 },
    petfood: { money: 1750 },
    pet: { money: 60000 },
    anggur: { money: 1000 },
    apel: { money: 1000 },
    jeruk: { money: 1000 },
    mangga: { money: 1000 },
    pisang: { money: 1000 },
    bibitanggur: { money: 1000 },
    bibitapel: { money: 1000 },
    bibitjeruk: { money: 1000 },
    bibitmangga: { money: 1000 },
    bibitpisang: { money: 1000 },
    umpan: { money: 2500 },
  },
};

let handler = async (m, { isPremium, command, usedPrefix, args, hanz }) => {
  const item = (args[0] || "").toLowerCase();
  let user = db.data.users[m.sender];

  if (command === "shop") {
    let buy = Object.fromEntries(
      Object.entries(items["buy"]).filter(([v]) => v && v in user)
    );
    let sell = Object.fromEntries(
      Object.entries(items["sell"]).filter(([v]) => v && v in user)
    );

    let teks = `––––––『 *SHOP* 』––––––

🆔 Nama : ${m.pushname}
💰 Saldo : Rp ${db.data.users[m.sender].money.toLocaleString()}
🎫 Limit : ${isPremium ? "Unlimited" : `${db.data.users[m.sender].limit}`}

🛒 Buy Item :
${Object.keys(buy)
  .map((v) => {
    let paymentMethod = Object.keys(buy[v]).find((v) => v in user);
    return `◆ 1 ${capitalize(v)} : Rp ${buy[v][paymentMethod].toLocaleString()}`.trim();
  })
  .join("\n")}
–––––––––––––––––––––––––

🛒 Sell Item :
${Object.keys(sell)
  .map((v) => {
    let paymentMethod = Object.keys(sell[v]).find((v) => v in user);
    return `◆ 1 ${capitalize(v)} : Rp ${sell[v][paymentMethod].toLocaleString()}`.trim();
  })
  .join("\n")}
–––––––––––––––––––––––––

 ⁉️ Tutorial :
➠ To Buy or Sell Item:
${usedPrefix}buy [item] [quantity]
${usedPrefix}sell [item] [quantity]
▧ Example:
${usedPrefix}buy potion 10
${usedPrefix}sell potion 10
`.trim();

    return hanz.reply(m.chat, teks, m);
  }

  const listItems = Object.fromEntries(
    Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user)
  );

  let text = command.toLowerCase() === "buy"
    ? `*BUYING*`
    : `*SELLING*`;

  let footer = command.toLowerCase() === "buy"
    ? `
🛒 List Item :
${Object.keys(listItems)
  .map((v) => {
    let paymentMethod = Object.keys(listItems[v]).find((v) => v in user);
    return `◆ 1 ${capitalize(v)} : Rp ${listItems[v][paymentMethod].toLocaleString()}`.trim();
  })
  .join("\n")}
–––––––––––––––––––––––––
 ⁉️ Tutorial :
➠ To Buy Items:
${usedPrefix}${command} [item] [quantity]
▧ Example:
${usedPrefix}${command} potion 10
`.trim()
    : `
🛒 List Item :
${Object.keys(listItems)
  .map((v) => {
    let paymentMethod = Object.keys(listItems[v]).find((v) => v in user);
    return `◆ 1 ${capitalize(v)} : Rp ${listItems[v][paymentMethod].toLocaleString()}`.trim();
  })
  .join("\n")}
–––––––––––––––––––––––––
 ⁉️ Tutorial :
➠ To Sell Items:
${usedPrefix}${command} [item] [quantity]
▧ Example:
${usedPrefix}${command} potion 10
`.trim();

  const total = Math.floor(
    isNumber(args[1])
      ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER)
      : 1
  );

  if (!listItems[item]) {
    return hanz.reply(
      m.chat,
      footer,
      m
    );
  }

  if (command.toLowerCase() === "buy") {
    let paymentMethod = Object.keys(listItems[item]).find((v) => v in user);
    if (user[paymentMethod] < listItems[item][paymentMethod] * total) {
      return hanz.reply(
        m.chat,
        `Kamu membutuhkan *${listItems[item][paymentMethod] * total - user[paymentMethod]}* ${capitalize(paymentMethod)} lagi untuk membeli *${total}* ${capitalize(item)}. Kamu hanya memiliki *${user[paymentMethod]}* ${capitalize(paymentMethod)}.`,
        m
      );
    }
    user[paymentMethod] -= listItems[item][paymentMethod] * total;
    user[item] += total;
    return hanz.reply(
      m.chat,
      `Sukses membeli *${total} ${capitalize(item)}*, seharga *${listItems[item][paymentMethod] * total} ${capitalize(paymentMethod)}*.`,
      m
    );
  } else {
    let paymentMethod = Object.keys(listItems[item]).find((v) => v in user);
    if (user[item] < total) {
      return hanz.reply(
        m.chat,
        `Kamu tidak memiliki cukup *${capitalize(item)}* untuk dijual, kamu hanya memiliki *${user[item]}* item.`,
        m
      );
    }
    user[item] -= total;
    user[paymentMethod] += listItems[item][paymentMethod] * total;
    return conn.reply(
      m.chat,
      `Sukses menjual *${total} ${capitalize(item)}*, seharga *${listItems[item][paymentMethod] * total} ${capitalize(paymentMethod)}*.`,
      m
    );
  }
};

handler.help = ["buy", "sell"].map((v) => v + " <item> <count>");
handler.tags = ["rpg"];
handler.command = /^(buy|sell|shop)$/i;
handler.register = true;
handler.group = true;
handler.disabled = false;

module.exports = handler;

function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number === "number" && !isNaN(number);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
