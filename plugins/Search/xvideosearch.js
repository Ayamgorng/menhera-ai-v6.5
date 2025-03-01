const fetch = require('node-fetch');

let handler = async (m, { hanz, text }) => {
  if (!text) throw 'Harap masukkan kata kunci untuk pencarian video.';

  try {
   
    let res = await fetch(`https://api.agatz.xyz/api/xvideo?message=${encodeURIComponent(text)}`);
    let json = await res.json();
    
    if (json.status !== 200 || !json.data || json.data.length === 0) {
      throw 'Tidak ada video ditemukan untuk kata kunci ini.';
    }
  
    let videos = json.data;
    let message = `Hasil pencarian video untuk *"${text}"*:\n`;

    
    videos.forEach(video => {
      message += `- Judul: ${video.title || 'Tidak ada judul'}\n` +
                 `  Durasi: ${video.duration || 'Tidak ada durasi'}\n` +
                 `  URL: ${video.url || 'Tidak ada URL'}\n` +
                 `  Thumbnail: ${video.thumb || 'Tidak ada thumbnail'}\n\n`;
    });
  
    await hanz.sendMessage(m.chat, {
      text: message,
    });

  } catch (e) {
    
    await hanz.sendMessage(m.chat, `Terjadi kesalahan: ${e.message || e}`);
  }
};


handler.command = ['xvideosearch'];
handler.tags = ['video'];

module.exports = handler;