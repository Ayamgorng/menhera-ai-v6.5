let handler = async (m, { hanz, q, setReply, isOwner, args, prefix, command }) => {
 
  let chat = db.data.chats[m.chat];

  
  const validTypes = ['thumbnail', 'document', 'audio', 'sticker'];

  if (args[0] && validTypes.includes(args[0])) {
  
    chat.welcomeType = args[0];
    setReply(`Berhasil mengubah tampilan welcomeType ke ${args[0]}.`);
  } else if (!args[0]) {
 
    setReply(`Silakan pilih salah satu tipe welcome berikut:

┌ • thumbnail  
│ • document 
│ • audio  
└ • sticker 

Contoh: ${prefix + command} audio`);
  } else {
  
    setReply("Perintah tidak ditemukan. Gunakan opsi yang valid.");
  }
};

handler.help = ["setwelcome"];
handler.tags = ["owner"];
handler.command = ["setwelcometype"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;