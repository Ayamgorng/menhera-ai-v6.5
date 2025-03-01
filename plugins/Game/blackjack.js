async function handler(m, { hanz, usedPrefix, command, text }) {
hanz.bj = hanz.bj ? hanz.bj : {};
if (m.sender in hanz.bj)
return m.reply("You are still in the game, wait until it finishes!!");
try {
let cards = [
"A",
"2",
"3",
"4",
"5",
"6",
"7",
"8",
"9",
"10",
"J",
"Q",
"K",
];

let playerCards = [];
let computerCards = [];

let calculateTotal = (cardArray) => {
let total = 0;
let hasAce = false;

for (let card of cardArray) {
if (card === "A") {
total += 11;
hasAce = true;
} else if (card === "K" || card === "Q" || card === "J") {
total += 10;
} else {
total += parseInt(card);
}
}

if (hasAce && total > 21) {
total -= 10;
}

return total;
};

let pickCard = () => {
let index = Math.floor(Math.random() * cards.length);
return cards[index];
};

if (!(m.sender in hanz.bj)) {
let bet = parseInt(text);
if (isNaN(bet) || bet <= 0) {
return m.reply(`*• Example :* ${usedPrefix + command} 1000`);
}
if (global.db.data.users[m.sender].money < bet) {
return m.reply("Your money is insufficient");
}

//playerCards.push(pickCard());
playerCards.push(pickCard());
computerCards.push(pickCard());

let playerTotal = calculateTotal(playerCards);
let computerTotal = calculateTotal(computerCards);


async function sendResultMessage(result, playerTotal, computerTotal) {
let message = `*• B L A C K J A C K - R E S U L T*

message += ╭── •
message += │ ◦ *Your Cards:* ${playerCards.join(", ")}
message += │ ◦ *Your Total:* ${playerTotal}
message += ├─ •
message += │ ◦ *ComputerCards*: ${computerCards.join(", ")}
message += │ ◦ *ComputerTotal:* ${computerTotal}
message += ╰── •

message += ${result}`

hanz.reply(m.chat, message, m, {
contextInfo: {
externalAdReply: {
title: "C A S I N O",
body: "",
thumbnailUrl: "https://telegra.ph/file/1703cff0a758d0ef8f84f.png",
sourceUrl: web,
mediaType: 1,
renderLargerThumbnail: true,
},
},
});
};


if (playerTotal === 21 && computerTotal !== 21) {
sendResultMessage(`
*You got Blackjack! You win!*\n*+${bet} money*,
playerTotal,
computerTotal,`
);
global.db.data.users[m.sender].money += bet * 1;
delete hanz.bj[m.sender];
} else if (playerTotal === 21 && computerTotal === 21) {
sendResultMessage(
"The result is a SERIES! Both get Blackjack!",
playerTotal,
computerTotal,
);
delete hanz.bj[m.sender];
} else {
hanz.bj[m.sender] = {
playerCards: playerCards,
computerCards: computerCards,
playerTotal: playerTotal,
computerTotal: computerTotal,
bet: bet,
timeout: setTimeout(() => {
m.reply("waktu habis");
delete hanz.bj[m.sender];
}, 60000),
};

let message =` *• B L A C K J A C K*

╭── •
│ ◦ *Your Cards:* ${playerCards.join(", ")}
│ ◦ *Your Total:* ${playerTotal}
├─ •
│ ◦ *ComputerCards:* ${computerCards[0]}, 
│ ◦ *Bet:* ${bet}
╰── •

Type *hit* to take additional cards.
Type *stand* to end the turn.`;

hanz.reply(m.chat, message, m, {
contextInfo: {
externalAdReply: {
title: "C A S I N O",
body: "",
thumbnailUrl: "https://telegra.ph/file/1703cff0a758d0ef8f84f.png",
sourceUrl: web,
mediaType: 1,
renderLargerThumbnail: true,
},
},
});
}
}
} catch (e) {
console.error(e);
hanz.reply(
m.chat,
"An error occurred while running the Blackjack game.",
m,
);

if (m.sender in hanz.bj) {
let { timeout } = hanz.bj[m.sender];
clearTimeout(timeout);
delete hanz.bj[m.sender];
return true;
}
}
}

handler.before = async (m,hanz) => {
hanz.bj = hanz.bj ? hanz.bj : {};
if (!(m.sender in hanz.bj)) return;
if (m.isBaileys) return;

let { timeout } = hanz.bj[m.sender];
let txt = (
m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : ""
).toLowerCase();
if (txt !== "stand" && txt !== "hit") return;

let cards = [
"A",
"2",
"3",
"4",
"5",
"6",
"7",
"8",
"9",
"10",
"J",
"Q",
"K",
];

let calculateTotal = (cardArray) => {
let total = 0;
let hasAce = false;

for (let card of cardArray) {
if (card === "A") {
total += 11;
hasAce = true;
} else if (card === "K" || card === "Q" || card === "J") {
total += 10;
} else {
total += parseInt(card);
}
}

if (hasAce && total > 21) {
total -= 10;
}

return total;
};

let pickCard = () => {
let index = Math.floor(Math.random() * cards.length);
return cards[index];
};

let bjData = hanz.bj[m.sender];
let playerCards = bjData.playerCards;
let computerCards = bjData.computerCards;
let playerTotal = calculateTotal(playerCards);
let computerTotal = bjData.computerTotal;
let bet = bjData.bet;

async function sendResultMessage(result, playerTotal, computerTotal) {
let message = `*• B L A C K J A C K - R E S U L T*

╭── •
│ ◦ *Your Cards:* ${playerCards.join(", ")}
│ ◦ *Your Total:* ${playerTotal}
├─ •
│ ◦ *ComputerCards*: ${computerCards.join(", ")}
│ ◦ *ComputerTotal:* ${computerTotal}
╰── •

${result}`

hanz.reply(m.chat, message, m, {
contextInfo: {
externalAdReply: {
title: "C A S I N O",
body: "",
thumbnailUrl: "https://telegra.ph/file/1703cff0a758d0ef8f84f.png",
sourceUrl: web,
mediaType: 1,
renderLargerThumbnail: true,
},
},
});
};

try {
if (/^hit?$/i.test(txt)) {
let newCard = pickCard();
playerCards.push(newCard);
playerTotal = calculateTotal(playerCards);

if (playerTotal > 21) {
sendResultMessage(`
*You lose! Total cards exceed 21.*\n*-${bet} money*`,
playerTotal,
computerTotal,
);
global.db.data.users[m.sender].money -= bet;
clearTimeout(hanz.bj[m.sender].timeout);
delete hanz.bj[m.sender];
} else if (playerTotal == 21) {
sendResultMessage(`
*You win!*\n*+${bet} money*`,
playerTotal,
computerTotal,
);
global.db.data.users[m.sender].money += bet * 1;
clearTimeout(timeout);
delete hanz.bj[m.sender];
} else {
let message = `*• B L A C K J A C K*

╭── •
│ ◦ *Your Cards:* ${playerCards.join(", ")}
│ ◦ *Your Total:* ${playerTotal}
├─ •
│ ◦ *ComputerCards:* ${computerCards[0]}, 
│ ◦ *Bet:* ${bet}
╰── •

Type *hit* to take additional cards.
Type *stand* to end turn.`;

hanz.reply(m.chat, message, m, {
contextInfo: {
externalAdReply: {
title: "C A S I N O",
body: "",
thumbnailUrl: "https://telegra.ph/file/1703cff0a758d0ef8f84f.png",
sourceUrl: web,
mediaType: 1,
renderLargerThumbnail: true,
},
},
});
}
} else if (/^stand?$/i.test(txt)) {
while (computerTotal < 18) {
let newCard = pickCard();
computerCards.push(newCard);
computerTotal = calculateTotal(computerCards);
}

if (computerTotal > 21) {
sendResultMessage(`
*You win! Computer's card total exceeds 21.*\n*+${bet} money*`,
playerTotal,
computerTotal,
);
global.db.data.users[m.sender].money += bet * 1;
} else if (playerTotal > computerTotal) {
sendResultMessage(
` *You win!*\n*+${bet} money*`,
playerTotal,
computerTotal,
);
global.db.data.users[m.sender].money += bet * 1;
} else if (playerTotal < computerTotal) {
sendResultMessage(
`*You lost!*\n*-${bet} money*`,
playerTotal,
computerTotal,
);
global.db.data.users[m.sender].money -= bet;
} else {
sendResultMessage(
"The result is a DRAW!",
playerTotal,
computerTotal,
);
}
clearTimeout(timeout);
delete hanz.bj[m.sender];
}
} catch (e) {
console.error(e);
hanz.reply(m.chat, "Terjadi kesalahan saat menjalankan game Blackjack.", m);
clearTimeout(timeout);
delete hanz.bj[m.sender];
return true;
}
};

handler.command = handler.help = ["blackjack", "bj"];
handler.tags = ["game"];
handler.noCmdStroe = true
handler.register = true;
handler.onlyGroup = true;

module.exports = handler;

