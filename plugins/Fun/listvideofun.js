let handler = async (m, { q, command, prefix, setReply }) => {
    
let teks = Ehztext(`Berikut Adalah List Video Fun

┌  ◦ tiktokghea
│  ◦ tiktokbocil
│  ◦ tiktokkayes
│  ◦ tiktokpanrika
│  ◦ cosplayangel
│  ◦ videosad
│  ◦ videowibu
└  ◦ videogalau
    
 untuk penggunaan nya Silakan Ketik Salah Satu List Tersebut Contoh
 *.cosplayangel* `)
 
    setReply(teks)
    
    }
    
handler.help = ["listvideofun"];
handler.tags = ["fun"];
handler.command = ["listvideofun"];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["daftar video fun"]
module.exports = handler;