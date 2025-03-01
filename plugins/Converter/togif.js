const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const BodyForm = require("form-data");

const handler = async (m, { hanz, command, sendReact }) => {
  const isQuotedSticker = m.quoted && m.quoted.mtype === "stickerMessage";
  const quoted = m.quoted ? m.quoted : m;

  if (!isQuotedSticker) {
    return m.reply("Reply stickernya");
  }
sendReact("🕒")
  try {
    let media = await hanz.downloadAndSaveMediaMessage(quoted);
    let webpToMp4 = await webp2mp4File(media); 

    if (!webpToMp4.status) {
      return m.reply("Gagal mengonversi stiker ke Gif");
    }

   
    await hanz.sendMessage(
      m.chat,
      {
        video: { url: webpToMp4.result },
        caption: "Convert Webp To Gif",
        gifPlayback: true,
      },
      { quoted: m }
    );

   
    fs.unlinkSync(media);
  } catch (err) {
    console.error(err);
    m.reply("Terjadi kesalahan saat memproses permintaan Anda.");
  }
};

handler.help = ["tomgif"];
handler.command = ["togif"];
handler.tags = ["convert"];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["ubah sticker jadi gif"]
module.exports = handler;

// Fungsi untuk konversi WebP ke MP4
async function webp2mp4File(path) {
  const form = new BodyForm();
  form.append("new-image-url", "");
  form.append("new-image", fs.createReadStream(path)); 

  try {
    
    const { data } = await axios.post("https://ezgif.com/webp-to-mp4", form, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
      },
    });

    const $ = cheerio.load(data);
    const file = $('input[name="file"]').attr("value");
    if (!file) throw new Error("Gagal mengambil file untuk konversi.");

   
    const bodyFormThen = new BodyForm();
    bodyFormThen.append("file", file);
    bodyFormThen.append("convert", "Convert WebP to MP4!");

    
    const { data: secondData } = await axios.post(
      "https://ezgif.com/webp-to-mp4/" + file,
      bodyFormThen,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${bodyFormThen._boundary}`,
        },
      }
    );

    const $2 = cheerio.load(secondData);
    const result = $2("div#output > p.outfile > video > source").attr("src");

    if (!result) throw new Error("Gagal menemukan video hasil konversi.");

    return {
      status: true,
      message: "Created By Zetsuboxygen",
      result: `https:${result}`,
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      message: err.message,
    };
  }
}
