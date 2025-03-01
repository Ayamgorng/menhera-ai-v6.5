const axios = require("axios");
const ms = require("parse-ms");
const { runtime, FileSize } = require("../../lib/myfunc");

let handler = async (m, { hanz, setReply }) => {
  try {
    const hitnya = db.data.hittoday || [];
    const dash = db.data.dashboard || [];
    const chats = db.data.chats || {};

    let storage = hanz.getDirSize(process.cwd());
    let moduls = hanz.getDirSize("./node_modules");
    let Session = hanz.getDirSize(global.session);

    // Ambil ukuran file database dari URL
    let databseSize = 0;
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/Raihan-Fadillah/database/main/database.json",
        { responseType: "arraybuffer" }
      );
      databseSize = response.data.length; // Panjang data dalam byte
    } catch (error) {
      console.error("Gagal mendapatkan ukuran database dari URL:", error.message);
    }

    // Generate teks untuk Group Hit
    let gcHit = `\n\n––––––『 Group Hit 』––––––\n`;
    for (let key in chats) {
      if (chats[key].hasOwnProperty("hit")) {
        gcHit += `⭔ ${chats[key].name || "Unknown Group"} : ${chats[key].hit}\n`;
      }
    }

    let totalHit = hitnya.reduce((acc, cur) => acc + (cur.count || 0), 0);
    let resetTime = hitnya.map((i) => ms(i.expired - Date.now()));
    let resetnye = resetTime
      .map(
        (time) =>
          `${time.hours || 0} jam ${time.minutes || 0} menit ${time.seconds || 0} detik`
      )
      .join(", ");

    let teks = `
––––––『 Dashboard 』––––––
⭔ Runtime: ${runtime(process.uptime())}
⭔ Reset: ${resetnye || "Tidak ada data reset"}
⭔ Total Hit: ${totalHit.toLocaleString()}
⭔ Storage: ${FileSize(storage)}
⭔ Modules: ${FileSize(moduls)}
⭔ Session: ${FileSize(Session)}
⭔ Database: ${FileSize(databseSize)}
`;

    // Commands Today
    let fall = "––––––『 Commands Today 』––––––\n";
    dash.forEach(
      (e) =>
        (fall += ` ⭔ ${e.cmd || "Unknown Command"} : ${
          (e.succes || 0) + (e.failed || 0)
        }\n`)
    );
    let akoh = `Total : ${dash.length} commands used`;

    // Commands Failed
    let tod = "––––––『 Commands Failed 』––––––\n";
    let filteredArray = dash.filter((item) => item.failed > 0);
    filteredArray.forEach(
      (e) =>
        (tod += ` ⭔ ${e.cmd || "Unknown Command"} : ${e.failed || 0}\n`)
    );
    let aw = `Total : ${filteredArray.length} commands failed`;

    // Total success dan failed
    let totalSuc = dash.reduce((acc, cur) => acc + (cur.succes || 0), 0);
    let totalFail = dash.reduce((acc, cur) => acc + (cur.failed || 0), 0);

    let tekz =
      teks +
      "\n\n" +
      fall +
      "\n" +
      akoh +
      "\n\n" +
      "––––––『 Commands Status 』––––––\n" +
      ` ⭔ Succes : ${totalSuc}\n` +
      ` ⭔ Failed : ${totalFail}\n\n` +
      tod +
      gcHit +
      "\n\n";

    let link = "https://telegra.ph/file/b659d66189445cab43a25.jpg";
    setReply(tekz);
  } catch (error) {
    console.error("Error in dashboard handler:", error);
    setReply("❌ *Terjadi Kesalahan!*\nTidak dapat menampilkan dashboard.");
  }
};

handler.help = ["db"];
handler.tags = ["spesifikasi"];
handler.command = /^(dashboard)$/i;

module.exports = handler;