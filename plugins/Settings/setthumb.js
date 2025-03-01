const fs = require("fs")
const fse = require('fs-extra');

let handler = async (m, { text, q, hanz, isOwner, setReply,reply,prefix,command }) => {
    
  const isQuotedImage = m.quoted && m.quoted.mtype === 'imageMessage';
    const isImage = m.mtype === 'imageMessage'; 
    const quoted = m.quoted ? m.quoted : m;
 
 
 if(isImage || isQuotedImage){
let delb = await hanz.downloadAndSaveMediaMessage(quoted)
await fse.copy(delb,`./stik/thumb.jpeg`)
fs.unlinkSync(delb)
setReply(`Berhasil mengubah image thumb`)
} else {
setReply(`Kirim gambar dengan caption ${prefix+command}`);
}
    
}

handler.help = ["setthumb"];
handler.tags = ["owner"];
handler.command = /^(setthumb)$/i;
handler.owner = true;
module.exports = handler;