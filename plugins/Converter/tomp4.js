const fetch = require("node-fetch");
const FormData = require("form-data");
const cheerio = require("cheerio");

const handler = async (m, { hanz, command, sendReact }) => {
  const isQuotedSticker = m.quoted && m.quoted.mtype === "stickerMessage";
  const quoted = m.quoted ? m.quoted : m;

  if (!isQuotedSticker) {
    return m.reply("Reply pada stiker yang ingin dikonversi ke MP4.");
  }

  try {
    let media = await quoted.download();
    let webpToMp4 = await webp2mp4(media);

    if (!webpToMp4) {
      return m.reply("Gagal mengonversi stiker menjadi video MP4.");
    }

    await hanz.sendMessage(
      m.chat,
      { video: { url: webpToMp4 }, caption: "Konversi WebP ke MP4 berhasil!" },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);
    sendReact("❌");
    m.reply(`Terjadi kesalahan: ${err.message}`);
  }
};

handler.help = ["tomp4"];
handler.command = ["tomp4"];
handler.tags = ["convert"];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["ubah sticker jadi video"]

module.exports = handler;

async function webp2mp4(source) {
  let form = new FormData();
  let isUrl = typeof source === "string" && /https?:\/\//.test(source);
  form.append("new-image-url", isUrl ? source : "");
  form.append("new-image", isUrl ? "" : source, "image.webp");

  // Kirim data ke ezgif
  let res = await fetch("https://ezgif.com/webp-to-mp4", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error(`Gagal mengakses Ezgif: ${res.statusText}`);
  }

  let html = await res.text();

  // Parse HTML menggunakan Cheerio
  const $ = cheerio.load(html);

  // Ambil nilai "file" dari input form
  let file = $('input[name="file"]').attr("value");
  if (!file) {
    throw new Error("Gagal mendapatkan file untuk konversi.");
  }

  // Proses konversi
  let form2 = new FormData();
  form2.append("file", file);

  let res2 = await fetch(`https://ezgif.com/webp-to-mp4/${file}`, {
    method: "POST",
    body: form2,
  });

  if (!res2.ok) {
    throw new Error(`Gagal memproses konversi: ${res2.statusText}`);
  }

  let html2 = await res2.text();

  // Parse HTML hasil konversi menggunakan Cheerio
  const $2 = cheerio.load(html2);

  // Ambil URL video dari elemen <source>
  let videoUrl = $2("div#output > p.outfile > video > source").attr("src");
  if (!videoUrl) {
    throw new Error("Gagal mendapatkan URL video yang dihasilkan.");
  }

  return `https://ezgif.com${videoUrl}`;
}
