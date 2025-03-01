
let handler = async (m, { hanz, q, setReply}) => {

if (!q) return setReply("Masukan nama stiker nya")
try {
if(!db.data.sticker[q]) return setReply("Nama tersebut tidak ada di dalam data base")
delete db.data.sticker[q]
setReply(`Succes delete sticker ${q}!`)
} catch (err) {
console.log(err)
setReply(`Gagal delete sticker ${q}!`)
}
}

handler.help = ['addvn'];
handler.tags = ['database'];
handler.command = /^(delstik)$/i; // 
handler.owner = true; 

module.exports = handler;