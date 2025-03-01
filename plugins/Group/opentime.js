let handler = async (m, { text,args, q, hanz,onlyAdmin,onlyBadmin, setReply, isOwner }) => {
    
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
    } else {return setReply("*pilih:*\ndetik\nmenit\njam\n\n*contoh*\n10 detik")}
    setReply(`Open time ${q} dimulai dari sekarang`)
    setTimeout( () => {
    const open = `*Tepat waktu* grup dibuka oleh admin\n sekarang member dapat mengirim pesan`
    hanz.groupSettingUpdate(m.chat, 'not_announcement') 
    setReply(open)
    }, timer)
};

handler.tags = ["group"];
handler.command = ["opentime"];

module.exports = handler;