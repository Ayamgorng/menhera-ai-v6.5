


let handler = async (m, { hanz, q, setReply}) => {
 if (!q) return setReply("Masukan nama vn nya")
try {
if(!db.data.audio[q]) return setReply("Nama tersebut tidak ada di dalam data base")
delete db.data.audio[q]
setReply(`Sukses delete vn ${q}`)
} catch (err){
console.log(err)
setReply('eror kak')
}

};

// Informasi command dan akses
handler.help = ['addvn'];
handler.tags = ['database'];
handler.command = /^(delvn)$/i; // Menggunakan command addvn
handler.owner = true; // Hanya pemilik bot yang bisa menggunakan fitur ini

module.exports = handler;