const axios = require('axios');
const yts = require('yt-search');
const { getBuffer } = require('../../lib/myfunc');


const randomAudioQuality = () => {
    const audioKeys = Object.keys({
        1: '32', 2: '64', 3: '128', 4: '192'
    });
    const randomIndex = Math.floor(Math.random() * audioKeys.length);
    return parseInt(audioKeys[randomIndex]);
};


const checkQuality = (type, qualityIndex) => {
    const qualities = {
        audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
        video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
    };
    if (!(qualityIndex in qualities[type])) {
        throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(qualities[type]).join(', ')}`);
    }
};


const fetchData = async (url, cdn, body = {}) => {
    const headers = {
        'accept': '*/*',
        'referer': 'https://ytshorts.savetube.me/',
        'origin': 'https://ytshorts.savetube.me/',
        'user-agent': 'Postify/1.0.0',
        'Content-Type': 'application/json',
        'authority': `cdn${cdn}.savetube.su`
    };

    try {
        const response = await axios.post(url, body, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const randomCdn = () => Math.floor(Math.random() * 11) + 51;


const dLink = (cdnUrl, type, quality, videoKey) => {
    return `https://${cdnUrl}/download`;
};


const dl = async (link, qualityIndex, typeIndex) => {
    const type = typeIndex === 1 ? 'audio' : 'video';
    const quality = { 1: '32', 2: '64', 3: '128', 4: '192' }[qualityIndex];
    if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
    checkQuality(type, qualityIndex);
    const cdnNumber = randomCdn();
    const cdnUrl = `cdn${cdnNumber}.savetube.su`;

    const videoInfo = await fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });
    const body = {
        downloadType: type,
        quality: quality,
        key: videoInfo.data.key
    };

    const dlRes = await fetchData(dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, body);

    return {
        link: dlRes.data.downloadUrl,
        duration: videoInfo.data.duration,
        durationLabel: videoInfo.data.durationLabel,
        fromCache: videoInfo.data.fromCache,
        id: videoInfo.data.id,
        key: videoInfo.data.key,
        thumbnail: videoInfo.data.thumbnail,
        thumbnail_formats: videoInfo.data.thumbnail_formats,
        title: videoInfo.data.title,
        titleSlug: videoInfo.data.titleSlug,
        videoUrl: videoInfo.data.url,
        quality,
        type
    };
};

let handler = async (m, { q, hanz, setReply, otw, sendSticker }) => {
    if (!q) return setReply("Kirim perintah dengan judul lagu atau link YouTube-nya!");

    try {
     
        await sendSticker(otw);
let rus = await yts(q);
        if (rus.all.length === 0) return setReply("Video tidak ditemukan atau tidak bisa di-download.");
        let data = rus.all.filter(v => v.type === 'video');
        if (data.length === 0) return setReply("Tidak ada video yang ditemukan.");
        let res = data[0];
        let thumbUrl = `https://i.ytimg.com/vi/${res.videoId}/hqdefault.jpg`;
        let inithumb = await getBuffer(thumbUrl);
        let teks = `*🎶 Y O U T U B E  -  P L A Y 🎶*\n\n` +
                   `📺 *Channel* : ${res.author.name}\n` +
                   `👀 *Viewers* : ${res.views} kali\n` +
                   `⏱️ *Durasi* : ${res.timestamp}\n` +
                   `🔗 *Link Video* : ${res.url}\n\n` +
                   `🎧 *Audio sedang diproses...* 🎶`;

        await hanz.sendMessage(m.chat, {
            contextInfo: { 
                externalAdReply: { 
                    showAdAttribution: true, 
                    title: res.title,
                    body: new Date().toLocaleString(),													
                    mediaType: 2,  
                    renderLargerThumbnail: true,
                    thumbnail: inithumb,
                    mediaUrl: res.url,
                    sourceUrl: res.url
                }
            },
            image: { url: thumbUrl },
            text: teks
        }, { quoted: m });
        
        const isUrl = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(q);
        let videoUrl = q;

        if (!isUrl) {
        
            let searchResults = await yts(q);
            if (!searchResults.all.length) return setReply("Video tidak ditemukan!");
            
            let videoData = searchResults.all.find(v => v.type === 'video');
            if (!videoData) return setReply("Tidak ada video yang cocok ditemukan!");
            
            videoUrl = videoData.url;
        }

       
        const qualityIndex = randomAudioQuality();

 
        const audioData = await dl(videoUrl, qualityIndex, 1); 
                
        
        await hanz.sendMessage(m.chat, { 
            audio: { url: audioData.link }, 
            mimetype: 'audio/mp4' 
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        setReply(`Terjadi kesalahan: ${err.message}`);
    }
};

handler.help = ["play", "playmusik", "ytaudio"];
handler.tags = ["downloader"];
handler.noCmdStore = true
handler.onlyGroup = true
handler.register = true
handler.description = ["unduhan audio dari judul"]

handler.command = ["play", "playmusik", "ytaudio"];

module.exports = handler;