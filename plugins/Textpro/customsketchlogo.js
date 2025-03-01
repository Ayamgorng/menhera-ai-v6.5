let handler = async (m, { hanz, setReply, prefix, command, args}) => {
  try {
    // Mengecek apakah args ada atau tidak
    if (args.length == 0) return setReply(`Example: ${prefix + command} Teks`);

    setReply('Processing...'); // Menampilkan status pemrosesan

    let ini_txt = args.join(" "); // Menggabungkan argumen menjadi satu teks
    // Membuat URL untuk menghasilkan gambar dengan teks dan warna yang ditentukan
    var buffer = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=${ini_txt}`;

    // Mengirim pesan dengan gambar hasil dari FlamingText
    await hanz.sendMessage(m.chat, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `${botName}`,
          mediaType: 3,
          renderLargerThumbnail: false,
          thumbnailUrl: 'https://telegra.ph/file/33d58a3a7b931d3902642.jpg',  // Menambahkan thumbnail URL
          sourceUrl: `https://wa.me/${nomerOwner}`,
        }
      },
      image: { url: buffer },
      caption: 'Here is your custom sketch name logo!',
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    setReply('Server sedang error, coba lagi besok!');
  }
};

handler.help = ['customsketchlogo'];
handler.command = ['customsketchlogo'];
handler.tags = ['textpro'];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
