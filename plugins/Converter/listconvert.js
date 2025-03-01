let handler = async (m, { q, command, prefix, setReply }) => {
    
let teks = Ehztext(`Berikut Adalah List Primbon

┌  ◦ bass
│  ◦ blown
│  ◦ deep
│  ◦ earrape
│  ◦ fast
│  ◦ fat
│  ◦ robot
│  ◦ slow
│  ◦ smooth
│  ◦ chipmunk
│  ◦ reverb
│  ◦ vocaloid
│  ◦ reverse
└  ◦ nightcore
    
 untuk penggunaan nya Silakan Ketik Salah Satu List Tersebut Contoh
 *.bass* `)
 
    setReply(teks)
    
    }
    
handler.help = ["listconvert"];
handler.tags = ["convert"];
handler.command = ["listconvert"];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["melihat daftar cmd convert"]
module.exports = handler;