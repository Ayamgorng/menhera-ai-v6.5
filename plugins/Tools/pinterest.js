const axios = require('axios'); 
let handler = async (m, { hanz, text, q, usedPrefix, command,setReply }) => {
  if (!text) return setReply(mess.query); 
  await setReply(mess.wait); 
  const { downloadContentFromMessage, generateWAMessageFromContent, proto, generateWAMessageContent } = require("baileys");

 
  
  
let search = text.split("|")[0]
let amount = text.split("|")[1] 
  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: {
        url
      }
    }, {
      upload: hanz.waUploadToServer
    });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  let push = [];
  let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${search}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${search}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
  let res = data.resource_response.data.results.map(v => v.images.orig.url);
  
  shuffleArray(res); // Mengacak array
  let ult = res.splice(0, amount || 5); // Mengambil 10 gambar pertama dari array yang sudah diacak
  let i = 1;
  
  for (let lucuy of ult) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `Image to - ${i++}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: ''
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: '',
        hasMediaAttachment: true,
        imageMessage: await createImage(lucuy)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_url",
            "buttonParamsJson": `{"display_text":"Source","url":"https://www.pinterest.com/search/pins/?rs=typed&q=${text}","merchant_url":"https://www.pinterest.com/search/pins/?rs=typed&q=${text}"}`
          }
        ]
      })
    });
  }
  
  const bot = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `ㅤ─۫  🎀 ⸼  *rᧉsᨣul𝗍  ꢁ* ${text}\nㅤ─۫  🎀 ⸼  *sᨣurcᧉ ⦂* pinterest.com`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: ``
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [
              ...push
            ]
          })
        })
      }
    }
  }, { quoted : fkontak });
  
  await hanz.relayMessage(m.chat, bot.message, {
    messageId: bot.key.id
  });


        

};

handler.help = ['ngl']; 
handler.tags = ['tools'];
handler.command = ['pin','pinterest']
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
