
const fs = require("fs-extra");

let handler = async (m, { text, q, hanz, isOwner, setReply,reply }) => {

fs.readdir("./session", async function (err, files) {
if (err) {
console.log('Unable to scan directory: ' + err);
return setReply('Unable to scan directory: ' + err);
} 
let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
   )
console.log(filteredArray.length); 
let teks =`Terdeteksi ${filteredArray.length} file sampah\n\n`
if(filteredArray.length == 0) return m.reply(teks)
filteredArray.map(function(e, i){
teks += (i+1)+`. ${e}\n`
})     
reply(teks) 
await sleep(2000)
reply("Menghapus file sampah...")
await filteredArray.forEach(function (file) {
fs.unlinkSync(`./session/${file}`)
});
await sleep(2000)
reply("Berhasil menghapus semua kenangan Mantan")     
});
    
}

handler.help = ["delsession"];
handler.tags = ["check"];
handler.command = /^(delsesi|clearsesi)$/i;
handler.owner = true;
module.exports = handler;