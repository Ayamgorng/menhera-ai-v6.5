const { FileSize } = require("../../lib/myfunc.js");
const fs = require("fs-extra");
const filestack = require("filestack-js");

const handler = async (m, { q,hanz, isOwner, setReply, command }) => {
  const isQuotedSticker =
    m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const client = filestack.init(fileStackApi);
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

  if (!isQuotedSticker) return setReply("Reply sticker");
  if (!q) return setReply("Nama stickernya apa?");

  if (command === 'addstikbot') {
    if (db.data.stickerBot[q]) return setReply("Nama tersebut sudah ada di dalam database");
    let media = await hanz.downloadAndSaveMediaMessage(quoted, q);
    await client.upload(media, {}, { filename: q }, {}).then((data) => {
      db.data.stickerBot[q] = {
        name: data._file.name,
        id: data.handle,
        size: FileSize(data._file.size),
        link: data.url,
      };
    });
    let teks = `Berhasil menambahkan sticker ke dalam database stickerBot dengan nama *${q}*`;
    await setReply(teks);
    await fs.unlinkSync(media);
  } else {
    if (db.data.sticker[q]) return setReply("Nama tersebut sudah ada di dalam database");
    let media = await hanz.downloadAndSaveMediaMessage(quoted, q);
    await client.upload(media, {}, { filename: q }, {}).then((data) => {
      db.data.sticker[q] = {
        name: data._file.name,
        id: data.handle,
        size: FileSize(data._file.size),
        link: data.url,
      };
    });
    let teks = `Berhasil menambahkan sticker ke dalam database dengan nama *${q}*`;
    await setReply(teks);
    await fs.unlinkSync(media);
  }
};

handler.command = ["addstikbot", "addstik", "addstick", "addsticker"];
handler.owner = true;

module.exports = handler;
