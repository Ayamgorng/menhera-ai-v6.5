

let handler = async (m, { hanz,setReply }) => {

let animRndm = Ehztext(`
🌟 **Silakan pilih salah satu karakter anime favorit Anda:**

**A**
  - akira
  - akiyama
  - anna
  - asuna
  - ayuzawa

- **B**
  - boruto

- **C**
  - chitanda
  - chitoge

- **D**
  - deidara

- **E**
  - elaina
  - emilia
  - erza

- **G**
  - gremory
  - hestia

- **H**
  - hinata

- **I**
  - inori
  - itachi
  - isuzu
  - itori

- **K**
  - kaga
  - kakasih
  - kaori
  - kaneki
  - kosaki
  - kotori
  - kuriyama
  - kuroha
  - kurumi

- **M**
  - madara
  - mikasa
  - miku
  - minato

- **N**
  - naruto
  - natsukawa
  - nekohime
  - nezuko
  - nishimiya

- **O**
  - onepiece

- **R**
  - rem
  - rize

- **S**
  - sagiri
  - sakura
  - sasuke
  - shina
  - shinka
  - shizuka
  - shota

- **T**
  - tomori
  - toukachan
  - tsunade

- **Y**
  - yatogami
  - yuki

📝 **Contoh Penggunaan:** 
Untuk memilih karakter, Anda dapat mengetik *.shina* sebagai contoh.
`);
setReply(animRndm)
}
handler.help = ["anime"];
    handler.tags = ["anime"];
    handler.command = ["randomanime"];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["melihat daftar anime"]
    module.exports = handler;
