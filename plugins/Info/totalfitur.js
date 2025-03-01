const fetch = require("node-fetch");
let handler = async (m, { hanz }) => {
  const fs = require("fs");
  const path = require("path");

  const pluginsFolderPath = "./plugins";
  const excludedFolders = [];
  function getFolderDetails(folderPath) {
    try {
      const items = fs.readdirSync(folderPath);
      let details = [];

      items.forEach((item) => {
        const itemPath = path.join(folderPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory() && !excludedFolders.includes(item)) {
          const jsFileCount = fs
            .readdirSync(itemPath)
            .filter((file) => path.extname(file) === ".js").length;

          details.push({ folder: item, files: jsFileCount });
        }
      });

      return details;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
 
  const folderDetails = getFolderDetails(pluginsFolderPath);
  const totalJSFiles = folderDetails.reduce((sum, detail) => sum + detail.files, 0);
  const totalFitur = () => {
    try {
      const mytext = fs.readFileSync("./message/case.js", "utf8");
      return (mytext.match(/(?<!\/\/)(case\s+['"][^'"]+['"])/g) || []).length;
    } catch (err) {
      console.error("Error:", err);
      return 0;
    }
  };

  const totalCases = totalFitur();
  const img = "https://telegra.ph/file/59a2583b604f3cb255cb4.jpg";
  const currentYear = new Date().getFullYear();
  const totalFeatures = totalJSFiles + totalCases;
  let teks = `––––––『 *TOTAL FEATURE* 』––––––\n\n`;

  teks += `📂 *Plugins*\n`;
  folderDetails.forEach((detail) => {
    teks += `- Folder: ${detail.folder}\n  File: ${detail.files} file.js\n`;
  });

  teks += `\n📌 *Case*\n`;
  teks += `- Total Case: ${totalCases}\n`;

  teks += `🌟 *Total Fitur: ${totalFeatures}*\n`;
  teks += `📅 Tahun: ${currentYear}`;
let teksnya = transformText(teks)
 
  const { generateWAMessageFromContent } = require("baileys")
let prep = generateWAMessageFromContent(m.chat, { orderMessage: { 
itemCount: `90000`, status: 500,
surface: 999,
message: teksnya,
description: '^^',
orderTitle: 'ʙᴇᴊɪʀ ᴅᴇᴋ',
token: '120363212768920223@g.us',
mediaType: 1,
curreyCode: 'IDR',
totalCurrencyCode: 'ʙᴇᴊɪʀ ᴅᴇᴋ',
totalAmount1000: '50000',
sellerJid: '6281316643491@s.whatsapp.net',
thumbnail: fs.readFileSync('./stik/rangel.jpg'), 
//thumbnaiUrl: pickRandom(fotoRandom)
}}, {contextInfo:{ externalAdReply: {
showAdAttribution: true, 
title: `${week} , ${calender}`,
body: `${botName}`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl:getRandom(fotoRandom),
sourceUrl: `${web}`}},quoted: fdoc})
hanz.relayWAMessage(prep)
    
};
handler.help = ["totalfitur"];
handler.tags = ["info"];
handler.command = ["totalfitur"];
handler.customPrefix = /(?:.)/;
module.exports = handler;