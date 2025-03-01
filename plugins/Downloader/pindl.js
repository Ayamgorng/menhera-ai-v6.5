const axios = require("axios");
const FormData = require("form-data");
const cheerio = require("cheerio");

let handler = async (m, { hanz, text, usedPrefix, command }) => {
    if (!text) throw `contoh: ${usedPrefix + command} https://pin.it/xwgvQTmG7`;

    try {
        m.reply(mess.wait)
        const {medias,title,thumbnail,duration} = await pindl(text);
        let mp4 = medias.filter(v => v.extension == "mp4");
        if (mp4.length !== 0) {
        await hanz.sendMessage(m.chat, {video: {url: mp4[0].url}, caption: `*Pinterest Downloader*`}, {quoted: m})
        } else {
        await hanz.sendFile(m.chat, thumbnail, '', `*Pinterest Downloader*`, m)
    }
    
    } catch (e) {
        throw e
    }
}
handler.help = ["pindownload","pindl"];
handler.command = /^(pindl|pinterestdl)$/i;
handler.tags = ["downloader"];
handler.noCmdStroe = true
handler.onlyGroup = true
handler.description = ["unduhan pinterest"]
module.exports = handler;

async function pindl(url) {
try {
const urls = 'https://pinterestdownloader.io/frontendService/DownloaderService';
const params = {
  url
};

let { data } = await axios.get(urls, { params })
return data
} catch (e) {
return {msg: e}
}
}