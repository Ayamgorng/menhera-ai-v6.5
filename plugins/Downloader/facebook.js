/* 
  ────────「 *RANGELOFFICIAL* 」──────── 
  Powered by *EhanzDhoanx* × *MENHERA MD* 
  Copyright © Raihan Fadillah 
  Instagram: @ehanzdhonax 

  ⚠️ *Jangan hapus watermark ini!* 
  Dukunganmu sangat berarti untuk kami! 
  ──────────────────────────────── 
*/

const fetch = require('node-fetch');

let handler = async (m, { hanz, text, usedPrefix, command,sendReact }) => {
  if (!text) throw `Masukkan URL Facebook.\nContoh: ${usedPrefix + command} https://www.facebook.com/share/r/1BGU23YTQc/?`;

  m.reply('Mencari video...');
  const headers = {
    'Content-Type': 'application/json',
  };

  const data = JSON.stringify({
    "url": text 
  });

  const options = {
    method: 'POST',
    headers: headers,
    body: data,
  };

  try {
    const response = await fetch('https://contentstudio.io/.netlify/functions/facebookdownloaderapi', options);
    if (!response.ok) throw `Terjadi kesalahan: ${response.statusText}`;
    const result = await response.json();
    if (result.url) {
      await hanz.sendFile(m.chat, result.url, 'video.mp4', `Berhasil menemukan video`, m);
    } else {
      throw 'Gagal mendapatkan URL video.';
    }
  } catch (error) {
    console.error(error);
    sendReact(`❌`);
  }
};

handler.command = ['fbdl','fb','facebook'];
handler.help = ['facebook'];
handler.tags = ['downloader'];
handler.limit = true;


module.exports = handler;