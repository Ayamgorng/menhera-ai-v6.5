let handler = async (m, { hanz, setReply, prefix, command, args}) => {
  try {
 
    if (args.length == 0) return setReply(`Example: ${prefix + command} Teks`);

    setReply('Processing...'); 
    let ini_txt = args.join(" ");
    var buffer = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=fluffy-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${ini_txt}`;

    
    await hanz.sendMessage(m.chat, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: wm,
          mediaType: 3,
          renderLargerThumbnail: false,
          thumbnail: `${getRandom(fotoRandom)}`,
          sourceUrl: `https://wa.me/${nomerOwner}`,
        }
      },
      image: { url: buffer },
      caption: 'Here is your fluffy logo text!',
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    setReply('Server sedang error, coba lagi besok!');
  }
};

handler.help = ['fluffylogo1'];
handler.command = ['fluffylogo1'];
handler.tags = ['textpro'];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
