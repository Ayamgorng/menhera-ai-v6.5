let handler = async (m, { q, command, prefix, setReply }) => {
let teks = Ehztext(`Berikut Adalah List Anime Gif

┌  ◦ hug
│  ◦ cry
│  ◦ kill
│  ◦ pat
│  ◦ lick
│  ◦ kiss
│  ◦ bite
│  ◦ yeet
│  ◦ bully
│  ◦ bonk
│  ◦ wink
│  ◦ poke
│  ◦ nom
│  ◦ slap
│  ◦ smile
│  ◦ wave
│  ◦ awoo
│  ◦ blush
│  ◦ smug
│  ◦ glomp
│  ◦ happy
│  ◦ dance
│  ◦ cringe
│  ◦ cuddle
│  ◦ highfive
│  ◦ handhold
│  ◦ feed
└  ◦ tickle
    
 untuk penggunaan nya Silakan Ketik Salah Satu List Tersebut Contoh
 *.smug* _reply or tag_ `)
 
    setReply(teks)
    
    }
    
handler.help = ["listianimegif"];
handler.tags = ["anime"];
handler.command = ["listianimegif"];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["Melihat daftar animegif"]
module.exports = handler;