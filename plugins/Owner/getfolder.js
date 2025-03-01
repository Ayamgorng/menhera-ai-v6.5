const fs = require("fs-extra");
const archiver = require("archiver");

let handler = async (m, { q, hanz, setReply }) => {
  if (!q) return setReply("Nama foldernya apa?");
  let mimetype = "application/zip";
  let name = `${q}.zip`;
  let jpegThumbnail = fs.readFileSync("./stik/menhera.jpg");

  try {
    let folderPath = `./${q}`;
    let folderExists = await fs.pathExists(folderPath);
    if (!folderExists) return setReply("Folder tidak ditemukan");

    setReply("Sedang membuat file ZIP, tunggu sebentar...");

    // Membuat file ZIP secara rekursif
    let output = fs.createWriteStream(name);
    let archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(folderPath, false); // Rekursif mengambil semua file/subfolder
    await archive.finalize();

    // Tunggu file ZIP selesai dibuat
    output.on("close", async () => {
      let file = fs.readFileSync(name);

      // Kirim file ZIP
      await hanz.sendMessage(
        m.chat,
        { document: file, fileName: name, mimetype, jpegThumbnail },
        { quoted: m }
      );

      // Hapus file ZIP setelah dikirim
      fs.unlinkSync(name);
    });
  } catch (error) {
    console.error(error);
    setReply(`Error: ${error.message}`);
  }
};

handler.help = ["getfolder"];
handler.tags = ["internet"];
handler.command = /^(getfolder|gfo)$/i;
handler.owner = true;
module.exports = handler;