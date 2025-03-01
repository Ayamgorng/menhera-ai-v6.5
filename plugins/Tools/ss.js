/*const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require('baileys');

let handler = async (m, { hanz, q,text,args, prefix,setReply,command,usedPrefix }) => {

    let link = text; // Simpan link yang dikirim ke dalam variabel 'link'
    if (!link) return m.reply(`Contoh ${usedPrefix + command} link`);
    if (!/^https?:\/\//.test(link)) return m.reply('Awali *URL* dengan http:// atau https://');
    

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: 'Silahkan pilih *option* di bawah ini'
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: wm
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: ``,
                        gifPlayback: true,
                        subtitle: ownerName,
                        hasMediaAttachment: false
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": `{"display_text":"Desktop","id":".sswebdekstop ${link}"}`
                            },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": `{"display_text":"Tablet","id":".sswebtablet ${link}"}`
                            },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": `{"display_text":"Phone","id":".sswebphone ${link}"}`
                            }
                        ],
                    }),
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                                newsletterName,
                                newsletterJid,
                            serverMessageId: 143
                        }
                    }
                })
            }
        }
    }, {});

  hanz.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    });
}
handler.tags = ["info"];
handler.command = ["ss"];
module.exports = handler;*/
let handler = async (m, { hanz, q,args, setReply }) => {
  const isUrl = (url) => {
    return url.match(
      new RegExp(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
        "gi"
      )
    );
  };

  if (!q) return setReply("Masukan Link");
  if (!isUrl(args[0]) && !args[0].includes("www.")) return m.reply("Link error");
  let Url = `https://api.apiflash.com/v1/urltoimage?access_key=${Apiflash}&wait_until=page_loaded&url=${q}`;
  hanz.sendMessage(
    m.chat,
    { image: { url: Url }, caption: "Nih" },
    { quoted: m }
  );
};

handler.tags = ["info"];
handler.command = ["ss","ssweb"];
module.exports = handler;
