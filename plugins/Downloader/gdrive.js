const fetch = require('node-fetch');
const { sizeFormatter } = require('human-readable');

const handler = async (m, { hanz, args, text }) => {
  const image = { url: "https://telegra.ph/file/980b0d179669359c650f3.jpg" };
  const formatSize = sizeFormatter({
    std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
  });

  async function GDriveDl(url) {
    let id;
    if (!(url && url.match(/drive\.google/i))) return m.reply('Link Google Drive-nya mana?');
    id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
    if (!id) return m.reply('ID Not Found');
    
    let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
      method: 'post',
      headers: {
        'accept-encoding': 'gzip, deflate, br',
        'content-length': 0,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'origin': 'https://drive.google.com',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
        'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
        'x-drive-first-party': 'DriveWebUi',
        'x-json-requested': 'true'
      }
    });
    
    let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4));
    if (!downloadUrl) return m.reply('Link Download Limit!');
    
    let data = await fetch(downloadUrl);
    if (data.status !== 200) throw data.statusText;
    
    return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') };
  }

  if (!args[0]) return m.reply('Input URL');

  GDriveDl(args[0]).then(async (res) => {
    let teks = `*乂 Gdrive Downloader*\n\n📂 File Name: ${res.fileName}\n📄 File Size: ${res.fileSize || 'Not Found'}\n🌐 Mimetype: ${res.mimetype}\n\n*_Tunggu sebentar ya kak sedang mengirim File!_*`;
    
    const contextInfo = {
      mentionedJid: [m.sender],
      externalAdReply: {
        showAdAttribution: true, 
        title: `${new Date().toLocaleString('en-US', { weekday: 'long' })}, ${new Date().toLocaleDateString()}`,
        mediaType: 1,  
        renderLargerThumbnail: true,
        thumbnailUrl: image.url,
        sourceUrl: res.downloadUrl
      }
    };
    
    hanz.sendMessage(m.chat, { text: teks, contextInfo }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 1000));
    hanz.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m });
  }).catch(error => {
    console.error(error);
    m.reply('Error: ' + error.message);
  });
};

handler.help = ['gdrive'];
handler.tags = ['downloader'];
handler.command = /^gdrive$/i;
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["unduhan drive"]
module.exports = handler;
