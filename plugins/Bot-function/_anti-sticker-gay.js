let handler = (m) => m;

handler.before = async function (m, { hanz   }) {
  //Anti sticker gay
  let antiSticker = db.data.others["antiSticker"];
  if (!antiSticker) db.data.others["antiSticker"] = [];
  let iniSticker =
    m.type == "stickerMessage"
      ? m.message.stickerMessage.fileSha256.toString("base64")
      : "";
  if (m.isGroup && m.isBotAdmin && antiSticker.includes(iniSticker))
    hanz.sendMessage(m.chat, { delete: m.key });
};
module.exports = handler;
