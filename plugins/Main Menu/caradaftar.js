const handler = async (m, { text, hanz }) => {
  try {
    let urlVideo = 'https://raw.githubusercontent.com/Rangelofficial/Uploade-db/main/uploader/1735476984523.mp4';

    // Mengirim pesan video dengan caption
    await hanz.sendMessage(
      m.chat,
      {
        video: { url: urlVideo }, 
        caption: 'Berikut Adalah Tutorialnya\nUntuk Cara Mendaftarkan Diri Di Database Bot Menhera'
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat mengirim pesan video.');
  }
};

handler.command = /^(caradaftar)$/i;

module.exports = handler;