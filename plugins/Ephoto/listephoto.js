let handler = async (m, { q, command, prefix, setReply }) => {
    
let teks = Ehztext(`Berikut Adalah List Ephoto 

┌  ◦ glitchtext
│  ◦ writetext
│  ◦ advancedglow
│  ◦ typographytext
│  ◦ pixelglitch
│  ◦ neonglitch
│  ◦ flagtext
│  ◦ flag3dtext
│  ◦ deletingtext
│  ◦ blackpinkstyle
│  ◦ glowingtext
│  ◦ underwatertext
│  ◦ logomaker
│  ◦ cartoonstyle
│  ◦ papercutstyle
│  ◦ watercolortext
│  ◦ effectclouds
│  ◦ blackpinklogo
│  ◦ gradienttext
│  ◦ summerbeach
│  ◦ luxurygold
│  ◦ multicoloredneon
│  ◦ sandsummer
│  ◦ galaxywallpaper
│  ◦ 1917style
│  ◦ makingneon
│  ◦ royaltext
│  ◦ freecreate
│  ◦ galaxystyle
└  ◦ lighteffects
    
 untuk penggunaan nya Silakan Ketik Salah Satu List Tersebut Contoh
 *.logomaker ehanz* `)
 
    setReply(teks)
    
    }
    
handler.help = ["listephoto"];
handler.tags = ["ephoto"];
handler.command = ["listephoto"];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["daftar cmd Ephoto "]
module.exports = handler;