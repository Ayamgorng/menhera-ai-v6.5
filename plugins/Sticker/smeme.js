const uploadImage = require("../../lib/uploadImage");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs-extra");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");



let handler = async (m, { q, hanz, args, setReply, prefix, command }) => {
  const isImage = m.type === "imageMessage";
  const isQuotedImage = m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const isQuotedSticker = m.type === "extendedTextMessage" && m.content.includes("stickerMessage");
  const quoted = m.quoted ? m.quoted : m.msg === undefined ? m : m.msg;

  if (!q) return setReply(`Masukan teks, contoh: ${prefix}smeme teks atas|teks bawah`);
  setReply(mess.wait);
async function makeSticker(media,Sticker, StickerTypes) {
  let jancok = new Sticker(media, {
    pack: packName, // Nama paket
    author: authorName, // Nama pembuat
    type: StickerTypes.FULL, // Tipe stiker
    categories: ['🤩', '🎉'], // Kategori stiker
    id: '12345', // ID stiker
    quality: 70, // Kualitas file output
    background: '#FFFFFF00' // Warna latar belakang stiker
  });

  let stok = getRandomFile(".webp");
  let nono = await jancok.toFile(stok);
  let nah = fs.readFileSync(nono);

  await hanz.sendMessage(m.chat, { sticker: nah }, { quoted: m });
  await fs.unlinkSync(stok); // Hapus file sementara
}
  var top = q.split("|")[0] ? q.split("|")[0] : "";
  var bottom = q.split("|")[1] ? q.split("|")[1] : "";

 /*if (isQuotedSticker) {
    let media = await hanz.downloadAndSaveMediaMessage(quoted, makeid(5));
    let ran = getRandomFile(".png");

    await ffmpeg(media)
      .save(ran)
      .on("error", (err) => {
        console.error(err);
        fs.unlinkSync(media);
        return m.reply(err);
      })
      .on('end', async () => {
        fs.unlinkSync(media);
   log('oke')
      });
  } else*/ if (isQuotedImage || isImage || isQuotedSticker ) {
    let olalah = await hanz.downloadAndSaveMediaMessage(quoted, makeid(5));
     let Uyya = fs.readFileSync(olalah)
    let anuah = await uploadImage(Uyya);

    let media = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${anuah}`;
    console.log(media);
    await makeSticker(media,Sticker, StickerTypes);
  
    await fs.unlinkSync(olalah);
  } else {
    setReply("Balas foto/stiker");
  }
};

handler.help = ["sticker"];
handler.tags = ["sticker"];
handler.command = ["smeme","smim"];
handler.noCmdStore = true  
handler.onlyGroup = true

module.exports = handler;
