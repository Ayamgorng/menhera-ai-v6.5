let handler = async (m, { hanz,setReply }) => {
    
    let daftarImage = Ehztext(`
🌟 **Daftar Gambar Menarik:**

1. **Anime & Kartun:**
   - kartun
   - megumin
   - waifu
   - shinomiya
   - yotsuba
   - doraemon

2. **Kpop:**
   - kpop
   - bts
   - exo
   - lisa
   - randblackpink

3. **Game:**
   - freefire
   - pubg
   - pokemon
   - gamewallpaper
   - gifs

4. **Estetika:**
   - aesthetic
   - technology
   - cyber
   - darkjokes

5. **Hewan:**
   - kucing
   - anjing
   - boneka

6. **Lainnya:**
   - katakata
   - hekel
   - hijaber
   - islamic
   - eba
   - mountain
   - neko
   - neko2
   - nekonime
   - panties
   - pentol
   - randomnime
   - randomnime2
   - rose
   - ryujin
   - satanic
   - tejina
   - wallhp
   - wallnime
   - cosplayloli
   - cosplaysagiri
   - cogan
   - chiho
   - cecan
   - ana
   - jeni
   - jiso
   - justina
   - kagura
   - yumeko
   - yulibocil
   - mikey
   - motor
   - mobil
`);



    setReply(daftarImage)
    }
    handler.help = ["anime"];
    handler.tags = ["anime"];
    handler.command = ["randomimage"];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["melihat daftar image"]
    module.exports = handler;

