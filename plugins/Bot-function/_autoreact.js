let handler = (m) => m;

handler.before = async function (m, { hanz, isPremium, isOwner, chatUpdate }) {
  //AUTO REACT
  let regex = [
    "bilek",
    "banh",
    "cum",
    "kntl",
    "anjing",
    "mmk",
    "bang",
    "wibu",
    "pantek",
    "pepek",
    "hentai",
  ];
  for (let i of regex) {
    if (m.isGroup && m.budy.toLowerCase().includes(i)) {
      await sleep(5000);
      let emot = [
        "🗿",
        "👍",
        "🙄",
        "😝",
        "😏",
        "💩",
        "👻",
        "🔥",
        "🤣",
        "🤬",
        "😎",
        "😂",
        "😘",
        "😑",
        "😱",
        "❤️",
        "🔥",
        "😳",
        "😍",
        "🤩",
        "🥳",
        "🤔",
        "🤗",
        "🤤",
        "👎",
        "👊",
        "🙈",
        "🤡",
      ].getRandom();
      hanz.sendMessage(m.chat, { react: { text: emot, key: m.key } });
    }
  }
};
module.exports = handler;