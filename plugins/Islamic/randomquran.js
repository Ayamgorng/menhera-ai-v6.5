const fetch = require("node-fetch");


function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let handler = async (m, { hanz, setReply }) => {
 
  const randomSurah = getRandom(Array.from({ length: 114 }, (_, i) => i + 1));

  let json1 = await fetch(`https://api.quran.gading.dev/surah/${randomSurah}`);
  let result1 = await json1.json();


  let randomAyat = getRandom(
    Array.from({ length: result1.data.numberOfVerses }, (_, i) => i + 1)
  );

  let json = await fetch(
    `https://api.quran.gading.dev/surah/${randomSurah}/${randomAyat}`
  );
  let result = await json.json();
  let url = result.data.audio.primary;

  let text = Ehztext(`
*Random Quran*

Quran : ${result.data.surah.name.short}
Teks latin : ${result.data.surah.name.translation.id}
Surat ke : ${result.data.surah.number}
Juz : ${result.data.meta.juz}
Total ayat : ${result.data.surah.numberOfVerses}
Ayat ke : ${result.data.number.inSurah}

Isi ayat : ${result.data.text.arab}

Latin: ${result.data.text.transliteration.en}

Arti dalam bahasa indonesia : ${result.data.translation.id}

Arti dalam bahasa inggris : ${result.data.translation.en}

Tafsir surah :  ${result.data.tafsir.id.long}
`);


  m.reply(text);

 
  await hanz.sendMessage(
    m.chat,
    { mimetype: "audio/mp4", audio: { url } },
    { quoted: m }
  );
};

handler.help = ["murothal"];
handler.tags = ["quotes"];
handler.command = ["randomquran"];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
