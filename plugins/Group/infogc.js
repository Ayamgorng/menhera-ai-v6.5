const moment = require("moment-timezone")
const { getBuffer } = require("../../lib/myfunc")
let handler = async (m, { q, hanz, from,isOwner, command, setReply }) => {
  if (!m.isGroup) return setReply("Hanya bisa di dalam group");
  let _meta = await hanz.groupMetadata(m.chat);
  let _img = await hanz.profilePictureUrl(_meta.id, "image");
    const isAntiLink = db.data.chats[from].antilink || false;
    const isAntidelete = db.data.chats[from].antidelete || false;
    const isKickarea = db.data.chats[from].antiasing || false;
    const isAntilinkGc = db.data.chats[from].antilinkgc || false;
    const isAntilinkCh = db.data.chats[from].antilinkch || false;
    const isAntiImage = db.data.chats[from].antiimage || false;
    const isAntiSticker = db.data.chats[from].antisticker || false;
    const isAntiAudio = db.data.chats[from].antiaudio || false;
    const isAntiVideo = db.data.chats[from].antivideo || false;
    const isAntiPromosi = db.data.chats[from].antipromosi || false;
    const isAntiToxic = db.data.chats[from].badword || false;
    const isBanchat = db.data.chats[from]?.banchat || false;
    const isAntiVirtex = db.data.chats[from].antivirtex || false;
    const isAntiWame = db.data.chats[from].antiwame || false;
    const isWelcome = db.data.chats[from].welcome || false;
    const isAntiSpam = db.data.chats[from].antispam || false;

  let caption =
    `${_meta.subject} - Created on ${moment(_meta.creation * 1000).format(
      "ll"
    )}\n\n` +
    `*${_meta.participants.length}* Total Members\n*${
      _meta.participants.filter((x) => x.admin === "admin").length
    }* Admin\n*${
      _meta.participants.filter((x) => x.admin === null).length
    }* Not Admin\n\n` +
    `Group ID : ${_meta.id}\nPemilik Grup: *${_meta.subjectOwner}*\n\n*🔒 Sistem Keamanan*
- Anti Link GC: *${isAntilinkGc ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Link: *${isAntiLink ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Virtex: *${isAntiVirtex ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Asing: *${isKickarea ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Delete: *${isAntidelete ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Gambar: *${isAntiImage ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Stiker: *${isAntiSticker ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Audio: *${isAntiAudio ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Video: *${isAntiVideo ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Promosi: *${isAntiPromosi ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Spam: *${isAntiPromosi ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Toxic: *${isAntiToxic ? 'Aktif ✅' : 'Mati ❌'}*
- Anti Wame: *${isAntiWame ? 'Aktif ✅' : 'Mati ❌'}*
- Ban Chat: *${isBanchat ? 'Aktif ✅' : 'Mati ❌'}*
- Welcome Message: *${isWelcome ? 'Aktif ✅' : 'Mati ❌'}*`;
  await hanz.sendMessage(
    m.chat,
    {
      caption,
      image: await getBuffer(_img),
    },
    { quoted: m }
  );
};

handler.tags = ["admin"];
handler.command = ["infogc"];
handler.group = true;
module.exports = handler;