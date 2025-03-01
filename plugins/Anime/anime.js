const fetch = require('node-fetch');

let handler = async (m, { command, hanz, sendButImg }) => {
   

    try {
        let response = await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/${command}.json`);
        let json = await response.json();

        if (json.length === 0) throw 'Tidak ada gambar yang ditemukan!';

        let randomImage = json[Math.floor(Math.random() * json.length)];
//sendButImg(`_${command}_`,randomImage,'Next_',`${command}`)
        await hanz.sendFile(m.chat, randomImage, 'image.jpg', `_${command}_`, m);
    } catch (e) {
        m.reply(`Terjadi kesalahan: ${e}`);
    }
};

handler.command = [
  'akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chitanda', 'chitoge', 'deidara',
  'doraemon', 'elaina', 'emilia', 'erza', 'gremory', 'hestia', 'hinata', 'inori', 'itachi',
  'isuzu', 'itori', 'kaga', 'kagura', 'kakasih', 'kaori', 'kaneki', 'kosaki', 'kotori', 'kuriyama',
  'kuroha', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'natsukawa', 'nekohime',
  'nezuko', 'nishimiya', 'onepiece', 'pokemon', 'rem', 'rize', 'sagiri', 'sakura', 'sasuke', 'shina',
  'shinka', 'shizuka', 'shota', 'tomori', 'toukachan', 'tsunade', 'yatogami', 'yuki'
];

handler.tags = ['anime'];
handler.help = ['akira', 'asuna', 'naruto', 'sasuke', 'hinata', 'pokemon', 'onepiece', 'nezuko', 'madara']; 
handler.onlyGroup = true
handler.description = ["kumpulan gambar anime"]
handler.noCmdStore = true
module.exports = handler;
