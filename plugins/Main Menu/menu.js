const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const { generateWAMessageFromContent,prepareWAMessageMedia, proto } = require("baileys");

let handler = async (m, { hanz, q, isOwner, setReply,sendvn,dmusic,onlyToko,ucapanWaktu }) => {
 
  const pluginsFolderPath = "./plugins";

  let forOwner = ['Bot-function']
  let forUser = ['Bot-function','Game_answer','Game_hints']
  const excludedFolders = isOwner ? forOwner : forUser; 
   function listFolders(folderPath, excludedFolders = []) {
        let result = '';
        const files = fs.readdirSync(folderPath);

        files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            const stat = fs.statSync(filePath);

            
            if (stat.isDirectory() && !excludedFolders.includes(file)) {
                result += `*-* menu ${file} \n`; 
                result += listFolders(filePath, excludedFolders); 
            }
        });

        return result;
    }

    const outputStringFolder = listFolders(pluginsFolderPath, excludedFolders);

  if (!q) {
    function toMonospace(text) {
      return `${text}`;
    }

    const timeWib = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    moment.tz.setDefault("Asia/Jakarta").locale("id");

    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001); 
    let dt = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
    const ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);

    let dot = new Date(new Date() + 3600000);
    const dateIslamic = Intl.DateTimeFormat("id-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dot);
// TAHUN BARU
let sekarang = moment().tz('Asia/Jakarta');
let tahunDepan = sekarang.year() + 1;
let tahunBaru = moment.tz(`${tahunDepan}-01-01 00:00:00`, 'Asia/Jakarta');
let selisih = moment.duration(tahunBaru.diff(sekarang));
let hari = Math.floor(selisih.asDays());
let jam = selisih.hours();
let menit = selisih.minutes();
let detik = selisih.seconds();
let ucapanTahunBaru = `Menuju tahun baru: ${hari} hari, ${jam} jam, ${menit} menit, dan ${detik} detik lagi.`;

    const data = global.db.data.others["newinfo"];
    const user = global.db.data.users[m.sender];
    const info = data ? data.info : "";
    const block = await hanz.fetchBlocklist();
    const timeInfo = data ? clockString(new Date() - data.lastinfo) : "tidak ada";
const publik = `${global.public}`
  
    function countJSFiles(folderPath) {
      try {
        const files = fs.readdirSync(folderPath);
        let jsFileCount = 0;

        files.forEach((file) => {
          const filePath = path.join(folderPath, file);
          const stat = fs.statSync(filePath); 

          if (stat.isDirectory()) {
            if (!excludedFolders.includes(file)) {
              jsFileCount += countJSFiles(filePath); 
            }
          } else {
            if (path.extname(file) === ".js") {
              jsFileCount++; 
            }
          }
        });

        return jsFileCount;
      } catch (error) {
        console.error("Error:", error);
        return 0; 
      }
    }

 
    const totalJSFiles = countJSFiles(pluginsFolderPath);

    
    const totalCase = () => {
      try {
        const mytext = fs.readFileSync("./message/case.js", "utf8");
        const numCases = (mytext.match(/(?<!\/\/)(case\s+['"][^'"]+['"])/g) || [])
          .length;
        return numCases;
      } catch (err) {
        console.error("Error:", err);
        return 0;
      }
    };
    let dataCase = fs.readFileSync(process.cwd() + '/message/case.js', 'utf8');
    let casePattern = /case\s+'([^']+)'/g; 
    let matches = dataCase.match(casePattern);

    if (!matches) {
        matches = []; 
    } else {
        matches = matches.map(match => match.replace(/case\s+'([^']+)'/, '$1')); 
    }

    const commandList = matches
        .map((a, i) => `*${i + 1}.* ${a}\n> Fitur sampingan (Case Fitur)`)
        .join("\n");
 
    const menu = transformText(`
 *– Info - Users*

┌  ◦ Name  : ${user.name || 'no name'}
│  ◦ Email : ${user.email || 'tidak Ada'}
│  ◦ Balance : ${user.balance || '0'}
│  ◦ Money : ${user.money || '0'}
└  ◦ Limit : ${user.limit || '0'}

*– Info - Botz*

┌  ◦ Running on: ${runWith}
│  ◦ Nama Bot: ${botName}
│  ◦ Menu Type : docImage
│  ◦ Total Users: ${Object.keys(db.data.users).length}
│  ◦ Banned: ${db.data.banned.length} 
│  ◦ Features: ${totalJSFiles}
│  ◦ Errors: ${db.data.listerror.length}
└  ◦ Github : ${sgh}

${readmore}
*– List - Menu*

${outputStringFolder}
──────────୨ৎ──────────
silahkan ketik *.menu <namafolder>* Jika Ingin Melihat Daftar Fitur Yang Ada Dalam Masing Masing Folder
`);

 function displayFilesByFolderAll(folderPath, excludedFolders = [], premium = [], limit = [], error = [], bloked = [], isLast = false) {
    let result = ''; 
    const filesAll = fs.readdirSync(folderPath);
    filesAll.forEach((file, index) => {
        const filePathAll = path.join(folderPath, file);
        const statAll = fs.statSync(filePathAll);
        const isDirectoryAll = statAll.isDirectory();
        const folderNameAll = isDirectoryAll ? path.basename(filePathAll) : '';
        const fileNameWithoutExtensionAll = isDirectoryAll ? '' : path.parse(file).name;
        const isLastFileAll = index === filesAll.length - 1 && !isDirectoryAll && isLast;

        if (isDirectoryAll && !excludedFolders.includes(folderNameAll)) {
            result += `▧──··· ${gris}「 ${Ehztext(folderNameAll)} 」${gris}\n`; 
            const isSubLast = index === filesAll.length - 1 && isLast;
            result += displayFilesByFolderAll(filePathAll, excludedFolders, premium, limit, error, bloked, isSubLast); 
        } else if (!isDirectoryAll && file.endsWith(".js")) {
            let marker = '';
            if (premium.includes(fileNameWithoutExtensionAll)) {
                marker += '  🅟';
            }
            if (limit.includes(fileNameWithoutExtensionAll)) {
                marker += '  🅛';
            }
            if (error.includes(fileNameWithoutExtensionAll)) {
                marker += '  🅔';
            }
            if (bloked.includes(fileNameWithoutExtensionAll)) {
                marker += '  🅑'; 
            }
       let description = "Desc :";
            try {
                const fileContent = require(filePathAll);
                if (fileContent.description) {
                    description = fileContent.description;
                }
            } catch (error) {
                description = `Error membaca deskripsi: ${error.message}`;
            }
            

            result += transformText(`▸ ${fileNameWithoutExtensionAll}${marker}\n> └ ${description}\n`); 

            if (isLastFileAll) {
                result += '\n'; 
            }
        }
    });

    if (!isLast && !result.endsWith('☉\n')) {
        result += '\n\n'; 
    }

    return result; 
}

    const pluginsFolderPathAll = path.join(process.cwd(), "plugins");
   // const excludedFoldersAll = ["Bot-function","Game_hints","Game_answer"]; 
    const premiumFilesAll = db.data.data.filter(item => item.name === 'premium')[0]?.id || [];
    const limitFilesAll = db.data.data.filter(item => item.name === 'limit')[0]?.id || [];
    const errorFilesAll = db.data.listerror?.map(item => item.cmd) || [];
    const blokedFilesAll = db.data.blockcmd?.map(item => item.cmd) || [];

    // Membaca seluruh struktur folder dan file
    const outputStringAll = displayFilesByFolderAll(
        pluginsFolderPathAll,
        excludedFolders,
        premiumFilesAll,
        limitFilesAll,
        errorFilesAll,
        blokedFilesAll,
        true
    );

const menuAll = `
📊 *Stats :*
┌  ◦ Running on: ${runWith}
│  ◦ Hits Today: ${
    thisHit == undefined
      ? "0"
      : thisHit.toLocaleString() == undefined
      ? "0"
      : thisHit.toLocaleString()
  }
│  ◦ Features: ${totalJSFiles}
│  ◦ Errors: ${db.data.listerror.length} 
│  ◦ Users: ${Object.keys(db.data.users).length}
│  ◦ Banned: ${db.data.banned.length} 
│  ◦ Blocked: ${block.length}
│  ◦ Premium: ${Object.values(db.data.users).filter((u) => u.premiumTime !== 0).length}
└  ◦ Blocked Commands: ${db.data.blockcmd.length} 

🕒 *Date & Time :* 
┌  ◦ ${week}, ${calender} 
│  ◦ ${timeWib} WIB
│  ◦ ${dateIslamic}
└  ◦ ${ucapanTahunBaru}

⚠ *Warning :*
┌  ◦ 🅟 : Premium
│  ◦ 🅛 : Limit
│  ◦ 🅔 : Error
└  ◦ 🅑 : Blocked

🆕 *Latest Update :*
┌ ◦ ${info}
╰ ◦ di update ${timeInfo} yang lalu

]––––––『 *Commands* 』––––––[\n\n`



  
  function displayFilesByFolder(folderPath, excludedFolders = []) {
    let result = [];

    const files = fs.readdirSync(folderPath);
    files.forEach((file, index) => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
      const isDirectory = stat.isDirectory();
      const folderName = isDirectory ? path.basename(filePath) : "";

      if (isDirectory && !excludedFolders.includes(folderName)) {
        result.push(folderName);
      }
    });

    return result; 
  }

 
  const outputString = displayFilesByFolder(pluginsFolderPath, excludedFolders);
var setmenu = db.data.settings['settingbot'].setmenu

if (setmenu === "livelocation") {
hanz.relayMessage(m.chat, { liveLocationMessage: { 
degreesLatitude: 35.676570,
degreesLongitude: 139.762148,
caption :transformText(menuAll) + readmore + outputStringAll,
sequenceNumber: 1656662972682001, timeOffset: 8600, 
jpegThumbnail: null,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
containsAutoReply: true,
showAdAttribution: true,
}
}
}
}, {quoted: m})
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu == "payment"){
let numb = ["7.76","15.48","8.92","10.72","13.48","4.39","5.99","2.56"]
let amont = numb[Math.floor(Math.random() * numb.length)]
hanz.relayMessage(m.chat,  {
requestPaymentMessage : {
expiryTimestamp: 0,												
currencyCodeIso4217: 'USD',
amount1000: (amont) * 1000,
requestFrom: `${m.sender.split('@')[0]}@s.whatsapp.net`,
noteMessage: {
extendedTextMessage: {
text : transformText(menuAll) + readmore + outputStringAll,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
}
}
}
}
}
}, {})
await sleep(1500) 
sendvn(dmusic)
 } else if (setmenu == "image"){
hanz.sendMessage(m.chat, { contextInfo: { externalAdReply: { showAdAttribution: true,
title: transformText(`Menhera Md 6.5.0`),
body:`${baileysVersion}`,
previewType:"PHOTO", 
thumbnailUrl: 'https://pomf2.lain.la/f/414x70lb.jpg',
sourceUrl:`${web}`
}}, image: fs.readFileSync('./stik/thumb.jpeg'), caption: transformText(menuAll) + readmore + outputStringAll},
{ quoted: fimage })
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu == "toko"){
return onlyToko()
 } else if (setmenu == "thumbnail"){
hanz.sendMessage(m.chat, { contextInfo: {
            externalAdReply: {
                showAdAttribution: true, 
                title: transformText(`Menhera Md 6.5.0`),
                body: transformText(`Runtime ${runTime}`),
                mediaType: 1,  
                renderLargerThumbnail: true,
                thumbnailUrl:'https://pomf2.lain.la/f/414x70lb.jpg',
                sourceUrl: `${web}`
            },
            editKey: { 
                remoteJid: m.sender, 
                id: 'some_unique_message_id'  
            }
        },
        text: transformText(menuAll) + readmore + outputStringAll
    }, { quoted: fimage });
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu == "gif"){
hanz.sendMessage(m.chat, { video: fs.readFileSync('./stik/video.mp4'),
gifPlayback: true,
caption: transformText(menuAll) + readmore + outputStringAll,
 contextInfo: {
 externalAdReply: {
containsAutoReply: true,
mediaType: 1,

renderLargerThumbnail: false,
showAdAttribution: true,
sourceUrl: "https://instagram.com/ehanzdhoanx",
thumbnailUrl: 'https://pomf2.lain.la/f/414x70lb.jpg',
title:transformText(`Menhera Md 6.5.0`),
body: `${ucapanWaktu} kak ${m.pushname}`,},},}, { quoted: fimage }); 
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu == "katalog"){
 const { generateWAMessageFromContent } = require("baileys")
let prep = generateWAMessageFromContent(m.chat, { orderMessage: { 
itemCount: `90000`, status: 500,
surface: 999,
message: transformText(menuAll) + readmore + outputStringAll,
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
sourceUrl: `${web}`}},quoted: fimage})
hanz.relayWAMessage(prep)
await sleep(1500) 
sendvn(dmusic)
    } else if (setmenu == "document"){
hanz.sendMessage(m.chat, {
document: fs.readFileSync("./package.json"),
fileName: wm,
mimetype: "application/vnd.ms-powerpoint",
jpegThumbnail:fs.readFileSync("./stik/menhera.jpg"),
caption: transformText(menuAll) + readmore + outputStringAll,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: transformText(`Menhera Md 6.5.0`),
body: `Hai  ${ucapanWaktu} kak ${m.pushname}` ,
thumbnail: fs.readFileSync('./stik/thumb.jpeg'),
thumbnailUrl: 'https://pomf2.lain.la/f/414x70lb.jpg',
sourceUrl: web,
mediaType: 1,
renderLargerThumbnail: true 
}}}, { quoted: m,ephemeralExpiration: 86400});
await sleep(1500) 
sendvn(dmusic)
} else if (setmenu === "docImage") {
let msg = generateWAMessageFromContent(
  m.chat,
  {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid,
              newsletterName,
              serverMessageId: 145
            },
            businessMessageForwardInfo: {
              businessOwnerJid: hanz.user.id
            },
            externalAdReply: {
              title: `${ucapanWaktu} kak ${m.pushname}`,
              body: `Runtime ${runTime}`,
              thumbnailUrl: 'https://pomf2.lain.la/f/414x70lb.jpg',
              sourceUrl: web,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          },
          body: proto.Message.InteractiveMessage.Body.create({
            text: menu,
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "ᴊᴇᴅᴀ ʙᴏᴛ ᴊɪᴋᴀ ᴛɪᴅᴀᴋ ᴍᴇʀᴇꜱᴩᴏɴ",
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: ``,
            thumbnailUrl: "",
            gifPlayback: true,
            subtitle: "",
            hasMediaAttachment: true,
            ...(await prepareWAMessageMedia({
              document: fs.readFileSync('./stik/rangel.jpg'),
              mimetype: "image/png",
              fileLength: 99999999999999,
              jpegThumbnail: fs.readFileSync('./stik/rangel.jpg'),
              fileName: `${m.pushname}`,
            }, {
              upload: hanz.waUploadToServer
            }))
          }),
          gifPlayback: true,
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [] // No buttons needed
          })
        }),
      }
    }
  },
  { quoted: m }
);


    await hanz.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });
    await sleep(1500)
      sendvn(dmusic)
    }
  } else {



function displayFilesByFolder(folderPath, folderNameQuery, excludedFolders = [], premium = [], limit = [], error = [], bloked = [], isLast = false) {
    let result = '';  
    const files = fs.readdirSync(folderPath);

    files.forEach((file, index) => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        const isDirectory = stat.isDirectory();
        const folderName = isDirectory ? path.basename(filePath) : '';
        const fileNameWithoutExtension = isDirectory ? '' : path.parse(file).name;
        const isLastFile = index === files.length - 1 && !isDirectory && isLast;

        if (isDirectory && folderName.toLowerCase() === folderNameQuery.toLowerCase()) { 
            result += `▧──··· ${gris}「 ${Ehztext(folderName)} 」${gris}\n`; 
            const isSubLast = index === files.length - 1 && isLast;
            result += displayFilesByFolder(filePath, folderNameQuery, excludedFolders, premium, limit, error, bloked, isSubLast); 
        } else if (!isDirectory) {
            let marker = '';
            if (premium.includes(fileNameWithoutExtension)) {
                marker += ' 🅟';
            }
            if (limit.includes(fileNameWithoutExtension)) {
                marker += ' 🅛';
            }
            if (error.includes(fileNameWithoutExtension)) {
                marker += ' 🅔';
            }
            if (bloked.includes(fileNameWithoutExtension)) {
                marker += ' 🅑'; 
            }

           
     let description = "deskripsi :";
            try {
                const fileContent = require(filePath);
                if (fileContent.description) {
                    description = fileContent.description;
                }
            } catch (error) {
                description = `Error membaca deskripsi: ${error.message}`;
            }

            const transformedFileName = `▸ ${fileNameWithoutExtension}`;
            result += transformText(`${transformedFileName}${marker}\n> └ ${description}\n`); 

            if (isLastFile) {
                result += '\n'; 
            }
        }
    });

    if (!isLast && !result.endsWith('\n')) {
        result += '\n\n';
    }

    return result; 
}
const queryFolder = q; 
    if (!queryFolder) return m.reply("Harap masukkan nama folder, contoh: menu ai");

    const pluginsFolderPath = path.join(process.cwd(), "plugins");
    
    const premiumFiles = db.data.data.filter(item => item.name === 'premium')[0]?.id || [];
    const limitFiles = db.data.data.filter(item => item.name === 'limit')[0]?.id || [];
    const errorFiles = db.data.listerror?.map(item => item.cmd) || [];
    const blokedFiles = db.data.blockcmd?.map(item => item.cmd) || [];

    
    const outputString = displayFilesByFolder(
        pluginsFolderPath,
        queryFolder,
        excludedFolders,
        premiumFiles,
        limitFiles,
        errorFiles,
        blokedFiles,
        true
    );

    if (!outputString.trim()) {
        return m.reply(`Folder *${queryFolder}* tidak ditemukan atau kosong.`);
    }



 const thumbnailUrl = global.imgMenu[queryFolder.toLowerCase()] || 'https://pomf2.lain.la/f/414x70lb.jpg';

  const contextInfo = {
  forwardingScore: 1,
  isForwarded: true,
  containsAutoReply: true,
  mentionedJid: [m.sender],
  forwardedNewsletterMessageInfo: {
  newsletterJid,
  serverMessageId: 100,
  newsletterName,
  },
  businessMessageForwardInfo: {
  businessOwnerJid: m.botNumber,
  },
  externalAdReply: {
  title: transformText(`Menhera Md 6.5.0`),
  body: transformText(`Runtime ${runTime}`),
  mediaType: 1,
  renderLargerThumbnail: true,
  thumbnailUrl,
  //jpegThumbnail: fs.readFileSync('./media/thumb2.jpg'),
  thumbnail: fs.readFileSync('./stik/thumb.jpeg'),
  sourceUrl: global.sig, 
  mediaUrl: global.syt,
  },
  };
  
  hanz.sendMessage(m.chat,{ contextInfo, mentions: [m.sender], text: outputString},{quoted:m});

}

};

handler.help = ["all"];
handler.tags = ["internet"];
handler.group = true
handler.gcStore = true
handler.register = true
handler.command = ["menu","helpmen"];
module.exports = handler;
