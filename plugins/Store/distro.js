const { downloadContentFromMessage,generateWAMessageFromContent,proto,prepareWAMessageMedia,generateWAMessageContent } = require("baileys")

let handler = async (m, { hanz, text, usedPrefix, command }) => {
let pan = `
> Berikut List Pakaian Yang Tersedia Saat Ini
`;
async function image(url) {
  const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: hanz.waUploadToServer
  });
  return imageMessage;
}
let msg = generateWAMessageFromContent(
  m.chat,
  {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: pan
          },
          carouselMessage: {
            cards: [
              {
                header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: getRandom(fotoPakaian) } }, { upload: hanz.waUploadToServer })),
          title: ``,
          gifPlayback: true,
          subtitle: '',
          hasMediaAttachment: false
        }),
                body: {
                  text: `Distro\nTersedia Ukuran m,l,xl,xxl`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"👤 Chat Owner ( ${global.nomerOwner} )","url":"https://wa.me/${global.nomerOwner}","merchant_url":"https://wa.me//${global.nomerOwner}"}`
                    },
                  ],
                },
              },
              {
                header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: getRandom(fotoPakaian) } }, { upload: hanz.waUploadToServer })),
          title: ``,
          gifPlayback: true,
          subtitle: '',
          hasMediaAttachment: false
        }),
                body: {
                  text: `
Distro2\nBahan Cutton Tersedia Ukuran s,m,l,xl,xxl\nTersisa 4 Pcs`
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"   ( ${botName} )","url":"https://wa.me/${global.nomerOwner}","merchant_url":"https://wa.me//${global.nomerOwner}"}`
                    },
                  ],
                },
              },
            ],
            messageVersion: 1,
          },
        },
      },
    },
  },
  {}
);

await hanz.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id,
});

}
handler.command = ['distro']
handler.help = ['distro'];
handler.tags = ['toko'];

handler.cmdStore = true
handler.description = ["list pakaian distro "]
module.exports = handler;