let handler = async (m, { q,hanz, isOwner, setReply }) => {

const isQuotedViewOnce = m.type === "extendedTextMessage" && m.content.includes("viewOnceMessage");
const { downloadContentFromMessage } = require("baileys")

if (!isQuotedViewOnce) return setReply("Reply viewonce nya");
let view = m.quoted.message;
let Type = Object.keys(view)[0];

let media = await downloadContentFromMessage(
view[Type],
Type == "imageMessage" ? "image" : "audioMessage" ? "audio" : "video"
);



let buffer = Buffer.from([]);
  
for await (const chunk of media) {
  Log(chunk)
buffer = Buffer.concat([buffer, chunk]);
}
  
if (/video/.test(Type)) {
    hanz.sendFile(m.chat, buffer, "media.mp4", view[Type].caption || "", m);
  } else if (/audio/.test(Type)) {
    hanz.sendMessage(m.chat, {audio:buffer},{quoted:m})
  } else if (/image/.test(Type)) {
    if(!m.isGroup){
      hanz.sendFile(m.botNumber, buffer, "media.jpg", view[Type].caption || "", m);
    } else hanz.sendFile(m.chat, buffer, "media.jpg", view[Type].caption || "", m);
  }
};
handler.help = ["reply viewonce"];
handler.tags = ["admin"];
handler.command = ["read","rvo"];
module.exports = handler;