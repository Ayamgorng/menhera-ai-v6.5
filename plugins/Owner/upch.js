const { proto } = require("baileys");

let handler = async (m, { hanz,setReply }) => {
    const quoted = m.quoted ? m.quoted : m;

  
  if (!quoted) return setReply("Harap reply pesan yang ingin diunggah ke channel.");

  try {
   
    const messages = quoted.fakeObj.message;
    const messageType = Object.keys(messages)[0]; 

    
    const messageToChannel = proto.Message.encode(messages).finish();

  
    let result = {
      tag: "message",
      attrs: { to: `${global.newsletterJid1}`, type: "text" },
      content: [],
    };

    switch (messageType) {
      case "imageMessage":
      case "videoMessage":
        result.content.push({
          tag: "media",
          attrs: {
            type: messageType === "imageMessage" ? "image" : "video",
          },
          content: messageToChannel,
        });
        break;

      case "documentMessage":
        result.content.push({
          tag: "document",
          attrs: {
            filename: messages.documentMessage.fileName || "file",
          },
          content: messageToChannel,
        });
        break;

      case "stickerMessage":
        result.content.push({
          tag: "sticker",
          attrs: {},
          content: messageToChannel,
        });
        break;

      default:
        result.content.push({
          tag: "plaintext",
          attrs: {},
          content: messageToChannel,
        });
        break;
    }

    
    await hanz.query(result);

 
    setReply("Pesan berhasil dikirim ke channel.");
  } catch (err) {
    setReply(`Terjadi kesalahan: ${err.message}`);
  }
};

handler.help = ["upch"];
handler.tags = ["channel"];
handler.command = ["upch"];
handler.owner = true;

module.exports = handler;
