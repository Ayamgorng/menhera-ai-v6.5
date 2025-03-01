
let handler = async (m, { q, command, prefix, setReply }) => {


let teks = Ehztext(`Berikut Adalah List Image Fun

┌  ◦ chinese
│  ◦ hijab
│  ◦ indo
│  ◦ thai
│  ◦ korean
│  ◦ malay
│  ◦ japanese
│  ◦ randomgirl
│  ◦ randomboy
└  ◦ vietnamese
    
 untuk penggunaan nya Silakan Ketik Salah Satu List Tersebut Contoh
 *.hijab* `)
 
    setReply(teks)
    
    }
    
handler.help = ["listimagefun"];
handler.tags = ["fun"];
handler.command = ["listimagefun"];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["daftar image fun"]
module.exports = handler;