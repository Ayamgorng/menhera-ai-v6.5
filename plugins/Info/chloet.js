
const moment = require("moment-timezone");

let handler = async (m, { hanz, command }) => {
  // Mendapatkan daftar newsletter
  let ids = Object.keys(db.data.chats).filter(id => id.endsWith("@newsletter"));
  let newsletters = [];

  for (let i of ids) {
    try {
      // Mengambil metadata newsletter
      let meta = await hanz.newsletterMetadata("jid", i);

      newsletters.push({
        subject: meta.name || "Unknown",
        id: meta.id || "N/A",
        role: meta.viewer_metadata ? meta.viewer_metadata.role : "N/A",
        followers: meta.subscribers ? meta.subscribers.toLocaleString() : "0",
        create: meta.creation_time ? moment(meta.creation_time * 1000).format("DD/MM/YYYY HH:mm:ss") : "N/A",
        picture: meta.picture ? "https://pps.whatsapp.net" + meta.picture : "N/A",
        url: meta.invite ? "https://whatsapp.com/channel/" + meta.invite : "N/A"
      });
    } catch (e) {
      console.error("Error fetching metadata:", e);
    }
  }

  // Format teks output
  let cap = `*– 乂 N E W S L E T T E R - L I S T*\n\n` +
    newsletters.map(n => Object.entries(n).map(([key, val]) => `   ◦ ${key} : ${val}`).join("\n")).join("\n\n") +
    `\n\n> Total Newsletter Chat: ${newsletters.length}`;

  m.reply(cap);
};

handler.help = handler.command = ["chlist"];
handler.tags = ["info"];

//export default handler  <- Untuk ESM, gunakan ini jika Anda memakai ESM
module.exports = handler;
