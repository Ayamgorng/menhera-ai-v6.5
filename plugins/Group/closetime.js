let handler = async (m, { text, args,q, hanz,onlyAdmin,onlyBadmin, setReply, isOwner }) => {
  const math = (teks) => {
    return Math.floor(teks);
  };
  let chat = db.data.chats[m.chat];
  if (!m.isAdmin) return onlyAdmin()
  if (!m.isBotAdmin) return onlyBadmin()
 if (args[1]=="detik") {var timer = args[0]*`1000`
} else if (args[1]=="menit") {var timer = args[0]*`60000`
} else if (args[1]=="jam") {var timer = args[0]*`3600000`
} else if (args[1]=="hari") {var timer = args[0]*`86400000`
} else {return setReply(`Contoh : ${prefix}closetime 5 detik`)}
let ko = await hanz.sendMessage(m.chat, { text:`Close time ${q} dimulai dari sekarang`}, {quoted: m})
setTimeout(() => deleteMessage(ko), 5000)

setTimeout( () => {
const tutup = `*Tepat waktu* grup ditutup oleh admin\n sekarang hanya admin yang dapat mengirim pesan`
hanz.groupSettingUpdate(m.chat, 'announcement')
  setReply(tutup)
}, timer)
};

handler.tags = ["group"];
handler.command = ["clostime"];
handler.onlyGroup = true;
module.exports = handler;