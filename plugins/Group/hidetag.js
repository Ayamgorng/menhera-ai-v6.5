const fs  = require('fs-extra')

let handler = async (m, { q, hanz, isOwner, command,onlyToko,onlyAdmin, setReply }) => {
  const isImage = m.type === "imageMessage";
  const isVideo = m.type === "videoMessage";
  const isAudio = m.type == "audioMessage";
  const isQuotedImage =
    m.type === "extendedTextMessage" && m.content.includes("imageMessage");
  const isQuotedVideo =
    m.type === "extendedTextMessage" && m.content.includes("videoMessage");
  const isQuotedAudio =
    m.type === "extendedTextMessage" && m.content.includes("audioMessage");
    const isQuotedText =
    m.type === "extendedTextMessage" && m.content.includes("conversation");

const quoted = m.quoted ? m.quoted : m
  if (!m.isGroup) return onlyToko()
  if (!m.isAdmin && !isOwner) return onlyAdmin()
  let mem = [];

  if (
    !isQuotedText &&
    (isQuotedImage ||
      isQuotedVideo ||
      isImage ||
      isVideo ||
      isQuotedAudio ||
      isAudio)
  ) {
    let p = m.quoted ? m.quoted : m;
    let media = await p.download(quoted);

    m.groupMembers.map((i) => mem.push(i.id));

    if (isQuotedImage || isImage) {
      let caption = m.quoted ? m.quoted.caption : q; // m.message.imageMessage.caption
      hanz.sendMessage(m.chat, {
        image: fs.readFileSync(media),
        caption,
        mentions: mem,
      });
    } else if (isQuotedVideo || isVideo) {
      let caption = m.quoted ? m.quoted.caption : q; // m.message.videoMessage.caption
      hanz.sendMessage(m.chat, {
        video: fs.readFileSync(media),
        caption,
        mentions: mem,
      });
    } else if (isQuotedAudio || isAudio) {
      //  let caption = m.quoted? m.quoted.caption : q // m.message.videoMessage.caption
      hanz.sendMessage(m.chat, {
        audio: fs.readFileSync(media),
        mentions: mem,
        mimetype: "audio/mp4",
      });
    }
  } else if (m.quoted && (m.quoted.mtype == "extendedTextMessage" || m.quoted.mtype == "conversation")) {
    Log("m.quoted.text");
    m.groupMembers.map((i) => mem.push(i.id));
    hanz.sendMessage(m.chat, { text: m.quoted.text, mentions: mem });
  } else {
    Log("nothing");
    m.groupMembers.map((i) => mem.push(i.id));
    hanz.sendMessage(m.chat, { text: q ? q : "", mentions: mem });
  }
};

handler.tags = ["admin"];
handler.command = ["hidetag", "tag"];
handler.group = true;
module.exports = handler;