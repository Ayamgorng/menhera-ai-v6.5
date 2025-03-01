const axios = require('axios');
const { GIFBufferToVideoBuffer,fetchJson } = require('../../lib/myfunc'); 

let handler = async (m, { hanz, setReply }) => {
  if (!m.mentionedJid[0] && !m.quoted) return setReply("Tag atau reply ke seseorang.");

  try {
    // Memuat gambar dari API
    const pat = await fetchJson(`https://nekos.life/api/v2/img/spank`);
    
    // Menentukan ID pengirim dan yang di-tag
    let messsender = m.sender;
    let musers = '';
    let users;
    let ment = [];

    try {
      users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
      ment = [messsender, users];
    } catch {
      users = "none";
      ment = [messsender, m.sender];
    }

    if (users === "none") {
      musers = `@${m.sender.split("@")[0]} spanked themself!`;
    } else {
      musers = `@${m.sender.split("@")[0]} spanked @${users.split("@")[0]}`;
    }

    // Mendapatkan buffer gambar dan mengonversinya menjadi video
    const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, "utf-8");
    const fetchedgif = await GIFBufferToVideoBuffer(buffer);

    // Mengirim pesan dengan video
    await hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
  } catch (error) {
    console.error(error);
    setReply("Terjadi kesalahan saat memuat gambar.");
  }
};

// Properti plugin
handler.help = ['spank'];
handler.command = ['spank'];
handler.tags = ['nsfw'];
handler.premium = true;
handler.nsfw = true;
handler.noCmdStore = true  

module.exports = handler;
