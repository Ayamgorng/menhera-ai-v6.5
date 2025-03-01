const chalk = require ('chalk')
const fs = require ('fs')
const path = require("path");
const { color, bgcolor } = require('../lib/color')

const Ehztext = (text, style = 1) => {
  var abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var ehz = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  abc.map((v, i) =>
    replacer.push({
      original: v,
      convert: ehz[style].split('')[i]
    })
  );
  var str = text.split('');
  var output = [];
  str.map((v) => {
    if (v.toUpperCase() !== v.toLowerCase() && v === v.toUpperCase()) {
      // If the character is uppercase, push it unchanged
      output.push(v);
    } else {
      // If the character is lowercase or not a letter, find and convert it
      const find = replacer.find((x) => x.original == v.toLowerCase());
      find ? output.push(find.convert) : output.push(v);
    }
  });
  return output.join('');
};

function displayFilesByFolderAll(folderPath, excludedFolders = [], premium = [], limit = [], error = [], bloked = [], isLast = false) {
    let result = ''; // Inisialisasi string kosong

    const filesAll = fs.readdirSync(folderPath);
    filesAll.forEach((file, index) => {
        const filePathAll = path.join(folderPath, file);
        const statAll = fs.statSync(filePathAll);
        const isDirectoryAll = statAll.isDirectory();
        const folderNameAll = isDirectoryAll ? path.basename(filePathAll) : '';
        const fileNameWithoutExtensionAll = isDirectoryAll ? '' : path.parse(file).name;
        const isLastFileAll = index === filesAll.length - 1 && !isDirectoryAll && isLast;

        if (isDirectoryAll && !excludedFolders.includes(folderNameAll)) {
            result += `▧──··· 「 ${folderNameAll} 」\n`; // Tambahkan nama folder ke string result
            const isSubLast = index === filesAll.length - 1 && isLast;
            result += displayFilesByFolderAll(filePathAll, excludedFolders, premium, limit, error, bloked, isSubLast); // Rekursif untuk folder dalam folder
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
                marker += '  🅑'; // Tambahkan tanda 🅑 jika file ada dalam blokedFiles
            }
       let description = "Desc";
            try {
                const fileContent = require(filePathAll);
                if (fileContent.description) {
                    description = fileContent.description;
                }
            } catch (error) {
                description = `Error membaca deskripsi: ${error.message}`;
            }

            result += `▸ ${fileNameWithoutExtensionAll}${marker}\n  └ ${description}\n`; // Tambahkan nama file dan deskripsi ke string result

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

    const pluginsFolderPath = path.join(process.cwd(), "plugins");
    const excludedFolders = ['Info','Ai','Anime','Bot-function','Converter','Downloader','Ephoto','Fun','Game','Game_answer','Game_hints','Group','Info','Islamic','Keamanan','Main Menu','Nsfw','Owner','RPG','Search','Settings','Sticker','Storage','Textpro','Tools','Shorturl','Uploader']; // Tambahkan nama folder yang ingin dikecualikan
const excludedFoldersToko = ['Info','Ai','Anime','Anonymous','Bot-function','Converter','Downloader','Ephoto','Fun','Game','Game_answer','Game_hints','Group','Info','Islamic','Keamanan','Main Menu','Nsfw','Owner','RPG','Search','Settings','Sticker','Storage','Textpro','Tools','Shorturl','Uploader'];
    const premiumFilesAll = db.data.data.filter(item => item.name === 'premium')[0]?.id || [];
    const limitFilesAll = db.data.data.filter(item => item.name === 'limit')[0]?.id || [];
    const errorFilesAll = db.data.listerror?.map(item => item.cmd) || [];
    const blokedFilesAll = db.data.blockcmd?.map(item => item.cmd) || [];

    // Membaca seluruh struktur folder dan file
    const outputStringAll = displayFilesByFolderAll(
        pluginsFolderPath,
        excludedFolders,
        premiumFilesAll,
        limitFilesAll,
        errorFilesAll,
        blokedFilesAll,
        true
    );
// ini fitur buaf di group toko
const outputStringToko = displayFilesByFolderAll(
        pluginsFolderPath,
        excludedFoldersToko,
        premiumFilesAll,
        limitFilesAll,
        errorFilesAll,
        blokedFilesAll,
        true
    );

global.imgMenu = {
    all: 'https://pomf2.lain.la/f/4kynvgsd.jpg',
    info: 'https://pomf2.lain.la/f/jkod0ted.jpg',
    anonymous: 'https://pomf2.lain.la/f/f3vt9oa.jpg',
    group: 'https://pomf2.lain.la/f/up7cml4e.jpg',    game: 'https://pomf2.lain.la/f/eiqsqg5i.jpg',
    rpg: 'https://pomf2.lain.la/f/n8z4kah3.jpg',
    download: 'https://pomf2.lain.la/f/7e4cq1yo.jpg',
    ai: 'https://pomf2.lain.la/f/m1f5azut.jpg',
    sticker: 'https://pomf2.lain.la/f/m01axuly.jpg',
    fun: 'https://pomf2.lain.la/f/2gcstp16.jpg',
    tools: 'https://pomf2.lain.la/f/rkpe24t.jpg',
    shorturl:'https://pomf2.lain.la/f/hu9s8b62.jpg',
    search: 'https://pomf2.lain.la/f/utm71qro.jpg',
    uploader: 'https://pomf2.lain.la/f/0nfjdweo.jpg',
    stalker: 'https://pomf2.lain.la/f/vux8fdq6.jpg',
    convert: 'https://pomf2.lain.la/f/9gl1e4eu.jpg',
    islamic: 'https://pomf2.lain.la/f/8xh0lrr.jpg',
    primbon: 'https://pomf2.lain.la/f/yxud4wc2.jpg',
    quotes: 'https://pomf2.lain.la/f/rxl6pgck.jpg',
    anime: 'https://pomf2.lain.la/f/5lu981te.jpg',
    ephoto: 'https://pomf2.lain.la/f/9cee2c1m.jpg',
    textpro: 'https://pomf2.lain.la/f/tpmooexs.jpg',
    nsfw: 'https://pomf2.lain.la/f/50ov59o7.jpg',
    panel: 'https://pomf2.lain.la/f/4ldnqbsm.jpg',
    topup: 'https://pomf2.lain.la/f/mz97crdo.jpg',
    bug: 'https://pomf2.lain.la/f/x5l8u23z.jpg',
    storage: 'https://pomf2.lain.la/f/qtdzdf08.jpg',
    settings: 'https://pomf2.lain.la/f/okcyvwie.jpg',
    owner: 'https://pomf2.lain.la/f/zv6z1tsp.jpg',
};
// jangan di hapus kontol klo mau tambahin aja nama lu
global.thanksto = (prefix) => {
return `${gris}✨ Ucapan Terima Kasih yang Dalam untuk ${gris}
◈ Allah Swt 🙏
◈ Orang Tua ❤️
◈ Penyedia Base (Dittaz) 💻
◈ Penyedia Modules ⚙️
◈ Penyedia API 🌐
◈ Ehanz (Rangel × Menhera) 🤖
◈ Avosky (that helps)
Dan semua Kreator Bot yang tak bisa saya sebutkan satu per satu 🌟
Semoga kebaikan dan inspirasi selalu menyertai kita semua! 🌈`
}
    
global.menuprivate = (prefix) => {
return `▧──··· 「 Cmd Private 」
▸ ai
  └ bantuan pertanyaan dengan ai
▸ ocr
  └ mengambil teks dari gambar
▸ remini
  └ memperjelas gambar
▸ sticker
  └ gambar/video menjadi sticker
▸ tovn
  └ audio jadi vn
▸ translate
  └ penerjemah bahasa

${outputStringAll}


`}

global.menutoko = (prefix) => {
return Ehztext(`
${outputStringToko}
`)}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
	delete require.cache[file]
	require(file)
})

