const fs = require('fs-extra');
const toMs = require('ms');
const ms = require('parse-ms');

let handler = m => m;

handler.before = async function (m, { hanz }) {  // Menambahkan `conn` sebagai parameter
  try {
    const data = db.data.chats;

    async function checkExpiration() {
      const currentTime = Date.now();

      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const item = data[key];

          if (item.expired !== 0 && item.expired < currentTime) {
            console.log(`Sewa '${key}' telah berakhir!`);
            delete global.db.data.chats[key];

            let photo = fotoRandom.getRandom();
            let contextInfo = {
              forwardingScore: 50,
              isForwarded: true,
              externalAdReply: {
                title: `${botName}`,
                body: `${baileysVersion}`,
                previewType: "PHOTO",
                thumbnailUrl: photo
              }
            };

            let Ownerin = `${nomerOwner}@s.whatsapp.net`;
            let text = `
––––––『 *SEWA EXPIRED* 』––––––
🔰 *Group*
• Name: ${item.name}
• Creator: ${item.creator}
• Group Id: ${item.id}
• Time order: ${item.timeOrder}
• Time end: ${item.timeEnd}
•·–––––––––––––––––––––––––·•
`;
            hanz.sendMessage(Ownerin, { contextInfo, text });  // Menggunakan `conn` dari parameter
            await sleep(3000);

            let cekdata = (hanz.chats[key] || await hanz.groupMetadata(key).catch(_ => false));
            if (!cekdata) return;

            let teks = `
🌟 *Pemberitahuan Penting* 🌟

⏳ Waktu sewa di grup ini telah berakhir. 
🤖 Bot akan keluar otomatis untuk menjaga kelancaran komunikasi. 

Terima kasih atas kerjasamanya! Jika ingin melanjutkan, silakan hubungi pemilik grup.
`;

            await hanz.sendMessage(key, { text: teks }).then(() => {
              hanz.groupLeave(key).then(() => {
                //global.db.data.chats[key].expired = 0
              });
            });
          }
        }
      }
    }

    // Memanggil kembali fungsi checkExpiration setelah 2 detik
    setTimeout(checkExpiration, 2000);

    // Memulai pemanggilan pertama untuk memulai loop
    checkExpiration();

    // Function untuk sewa group
    setInterval(async () => {
      try {
        Object.values(global.db.data.chats).forEach(async (chat) => {
          if (chat.threeDaysLeft == undefined) chat.threeDaysLeft = false;
          if (chat.tenDaysLeft == undefined) chat.tenDaysLeft = false;
          if (chat.oneDaysLeft == undefined) chat.oneDaysLeft = false;
          let three = chat.threeDaysLeft;
          let ten = chat.tenDaysLeft;
          let one = chat.oneDaysLeft;
          let threeLeft = ms(chat.expired - Date.now() - toMs("3d"));
          let tenLeft = ms(chat.expired - Date.now() - toMs("10d"));
          let oneLeft = ms(chat.expired - Date.now() - toMs("1d"));
          let photo = fotoRandom.getRandom();
          let contextInfo = {
            forwardingScore: 50,
            isForwarded: true,
            externalAdReply: {
              title: `${botName}`,
              body: `${baileysVersion}`,
              previewType: "PHOTO",
              thumbnailUrl: photo
            }
          };

          if (chat.expired >= 0 && !three && threeLeft.days === 0) {
            chat.threeDaysLeft = true;
            let cekid = ms(chat.expired - Date.now());
            let teks = `\n––––––『 *SISA WAKTU* 』––––––\n\n
*Group*: ${chat.name}
*ID*: ${chat.id}
*EXPIRE :* ${cekid.days} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit, ${cekid.seconds} Detik

📮 *Note:* ↓
• Silakan hub owner untuk menambah sewa
`;
            hanz.sendMessage(chat.id, { contextInfo, text: teks }).catch((err) => console.log(err));
          } else if (chat.expired != 0 && !ten && tenLeft.days === 0) {
            chat.tenDaysLeft = true;
            let cekid = ms(chat.expired - Date.now());
            let teks = `\n––––––『 *SISA WAKTU* 』––––––\n\n
*Group*: ${chat.name}
*ID*: ${chat.id}
*EXPIRE :* ${cekid.days} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit, ${cekid.seconds} Detik

📮 *Note:* ↓
• Silakan hub owner untuk menambah sewa
`;
            hanz.sendMessage(chat.id, { contextInfo, text: teks }).catch((err) => console.log(err));
          } else if (chat.expired != 0 && !one && oneLeft.days === 0) {
            chat.oneDaysLeft = true;
            let cekid = ms(chat.expired - Date.now());
            let teks = `\n––––––『 *SISA WAKTU* 』––––––\n\n
*Group*: ${chat.name}
*ID*: ${chat.id}
*EXPIRE :* ${cekid.days} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit, ${cekid.seconds} Detik

📮 *Note:* ↓
• Silakan hub owner untuk menambah sewa
`;
            hanz.sendMessage(chat.id, { contextInfo, text: teks }).catch((err) => console.log(err));
          }
        });
      } catch 
(err) {
        console.log(err);
      }
    }, 3000);

  } catch (err) {
    console.log(err);
  }
};

module.exports = handler;
