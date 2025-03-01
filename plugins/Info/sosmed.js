let handler = async (m, { hanz,usedPrefix }) => {
  let today = new Date();
  let curHr = today.getHours();
  let timeOfDay;

  if (curHr < 12) {
    timeOfDay = 'pagi';
  } else if (curHr < 18) {
    timeOfDay = 'siang';
  } else {
    timeOfDay = 'malam';
  }

  let payText = `
Halo Kak, selamat ${timeOfDay} 🌞🌛

╭‒‒‒‒‒‒‒‒‒‒‒‒╼
*Instagram*
    ≡ ${sig}
*Github*
    ≡ ${sgh}
*Facebook*
    ≡ 
*YouTube* 
    ≡ ${syt}
*TikTok*
    ≡ ${global.stt}
╰‒╼ *WhatsApp*
    ≡ wa.me//${nomerOwner}

${gris}Ini adalah akun media sosial pengembang bot WhatsApp ini. Saat ini, saya sedang dalam tahap belajar pemrograman untuk menciptakan sesuatu yang bermanfaat dan menyenangkan. Dengan dukungan kalian, saya berharap dapat terus berkembang dan memberikan pengalaman yang lebih baik melalui bot ini.${gris}

_Silakan kunjungi dan ikuti untuk mendapatkan pembaruan terbaru tentang bot ini. Setiap feedback dan saran sangat berarti bagi saya_!
`;

  await hanz.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '📱' }}, { messageId: m.key.id });
  
  hanz.sendMessage(m.chat, {
    text: payText, 
    contextInfo: {
      externalAdReply: {
        title: 'I N F O  S O S M E D',
        body: `${baileysVersion}`,
        thumbnailUrl: pickRandom(global.fotoRandom), 
        sourceUrl: `${web}`,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
};

handler.command = /^(sosmed)$/i;
handler.tags = ['info'];
handler.help = ['sosmed'];

module.exports = handler;

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}