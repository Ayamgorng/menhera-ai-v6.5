const handler = async (m, { hanz, setReply }) => {
  try {

    if (!m.quoted) return setReply('Reply Image/Video');

    const mime = m.quoted.mimetype; 

    if (/image/.test(mime)) {
      let image = await hanz.downloadAndSaveMediaMessage(m.quoted);
      await hanz.sendMessage(m.chat, {
        image: { url: image },
        caption: mess.success, 
        fileLength: "999", 
        viewOnce: true 
      }, { quoted: m });
    } else if (/video/.test(mime)) {
   
      let video = await hanz.downloadAndSaveMediaMessage(m.quoted);
      await hanz.sendMessage(m.chat, {
        video: { url: video },
        caption: mess.success, 
        fileLength: "99999999", 
        viewOnce: true 
      }, { quoted: m });
    } else if (/audio/.test(mime)) {
   
      let audio = await hanz.downloadAndSaveMediaMessage(m.quoted);
      await hanz.sendMessage(m.chat, {
        audio: { url: audio },
        mimetype: 'audio/mpeg',
        ptt: true, 
        viewOnce: true 
      });
    } else {
      setReply('Media yang di-reply bukan gambar, video, atau audio.');
    }
  } catch (e) {
    console.error(e);
    setReply('Terjadi kesalahan saat mengirim media!');
  }
};

handler.help = ['toviewonce'];
handler.command = ['toviewonce'];
handler.tags = ['media'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["audio/video mu jadi viewonce "]

module.exports = handler;
