const fs = require("fs");
const path = require("path");
const Jimp = require('jimp');
const axios = require("axios");
const moment = require("moment-timezone");
const { ttsAudio } = require('../lib/scraper');

async function autoOpenCloseGc(conn) {
  let setTime = global.db.data.others?.setTime || {};
  const groupIds = Object.keys(setTime);
  
  for (const groupId of groupIds) {
    const { timeOpen, timeClose, reasonOpen, reasonClose } = setTime[groupId];
    const now = moment().tz("Asia/Jakarta").format("HH:mm");   
    let groupMetadata = await conn.groupMetadata(groupId).catch(() => null);
    if (!groupMetadata) {
        console.error(`Gagal mendapatkan metadata grup ${groupId}.`);
        continue;
      }
    let mems = groupMetadata.participants.map(participant => participant.id);
    if (timeOpen && now === timeOpen) {
      try {
        await conn.groupSettingUpdate(groupId, 'not_announcement');
        console.log(`Grup ${groupId} berhasil dibuka pada ${timeOpen}`);           
        let teksBuka = `🌟 Grup telah *dibuka* pada waktu yang dijadwalkan (${timeOpen}). Anggota kini dapat mengirim pesan.\n\n📄 *Alasan:* ${reasonOpen || "Tidak ada alasan yang diberikan."}`;        let audioBuffer = await ttsAudio(teksBuka)
      conn.sendMessage(
          groupId,
          { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true })

        
        await conn.sendMessage(groupId, { 
          image: { url: 'https://files.catbox.moe/04o7li.jpeg' }, 
          caption: teksBuka,
          contextInfo: { mentionedJid: mems }
        });
      } catch (error) {
        console.error(`Gagal membuka grup ${groupId}:`, error);
      }
    }  
    if (timeClose && now === timeClose) {
      try {
        await conn.groupSettingUpdate(groupId, 'announcement');
        console.log(`Grup ${groupId} berhasil ditutup pada ${timeClose}`);       
        let teksTutup = `🔒 Grup telah *ditutup* pada waktu yang dijadwalkan (${timeClose}). Hanya admin yang dapat mengirim pesan.\n\n📄 *Alasan:* ${reasonClose || "Tidak ada alasan yang diberikan."}`;    
        await conn.sendMessage(groupId, { 
          image: { url: 'https://files.catbox.moe/9ab8ib.jpeg' }, 
          caption: teksTutup,
          contextInfo: { mentionedJid: mems }
        });
      } catch (error) {
        console.error(`Gagal menutup grup ${groupId}:`, error);
      }
    }
  }
}

async function notifGcAlarm(conn) {
  let setTimeAlarm = global.db.data.others?.setTimeAlarm || [];
  let timeAlarm = global.db.data.others?.timeAlarm || [];
  if (setTimeAlarm.length > 0) {
    for (let i = 0; i < setTimeAlarm.length; i++) {
      const { chatId, time, teks, alarmName } = setTimeAlarm[i];  
      const now = moment().tz("Asia/Jakarta").format("HH:mm");   
      if (now === time) {     
        let groupMetadata = await conn.groupMetadata(chatId).catch(() => null);
    if (!groupMetadata) {
        console.error(`Gagal mendapatkan metadata grup ${groupId}.`);
        continue;
      }
        let groupName = groupMetadata?.subject || "Grup";
        let teksAlarm = `${gris1}*🔔 ALARM TIBA!*  
🕒 *Waktu:* ${time}  
🏷️ *Nama Alarm:* ${alarmName}  
💬 *Pesan Alarm:* "${teks}"  
📢 *Grup:* ${groupName}  
⏰ *Segera siapkan diri untuk aktivitas berikutnya!*${gris1}`;
        let mems = groupMetadata ? groupMetadata.participants.map(participant => participant.id) : [];     
        await conn.sendMessage(chatId, {
          image: { url: 'https://files.catbox.moe/60d57f.jpeg' },
          caption: teksAlarm,
          contextInfo: { mentionedJid: mems }
        }); 
        await conn.sendMessage(chatId, {
          audio: { url: 'https://sf16-ies-music-va.tiktokcdn.com/obj/musically-maliva-obj/7337315122805000966.mp3' },
          mimetype: "audio/mp4",
          ptt: true
        });
        console.log(`Alarm "${alarmName}" telah dikirim ke grup ${groupName} pada ${time}.`);        
        if (!timeAlarm.includes(chatId)) {
          timeAlarm.push(chatId);
        }
      }
    }
    global.db.data.others.timeAlarm = timeAlarm;
    global.db.data.others.setTimeAlarm = setTimeAlarm;
  }
}

async function notifPrivate(conn) {
  let notipPrivate = global.db.data.others?.notipPrivate || []; 
  let timePrivate = global.db.data.others?.timePrivate || [];   

  if (notipPrivate.length > 0) {
    for (let i = 0; i < notipPrivate.length; i++) {
      const { chatId, nomorTujuan, time, teks, notifikasiName } = notipPrivate[i];  
      const now = moment().tz("Asia/Jakarta").format("HH:mm"); 
      if (now === time) {
  const fvn = { key: { fromMe: false,participant: nomorTujuan, ...(nomorTujuan ? { remoteJid: "status@broadcast" } : {}) }, message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds": "9999","ptt": "true"}}}

        let teksNotif = transformText (`*🔔 NOTIFIKASI PRIVATE TIBA!*
🕒 *Waktu:* ${time}
🏷️ *Nama Notifikasi:* ${notifikasiName}
💬 *Pesan Notifikasi:* "${teks}"
⏰ *Segera lihat pesan ini untuk informasi lebih lanjut!`);

        try {
          await conn.sendMessage(nomorTujuan, {
  text: teksNotif 
}, {
  quoted: fvn 
});
          console.log(`Notifikasi private "${notifikasiName}" telah dikirim ke ${nomorTujuan} pada ${time}.`);
   
          if (!timePrivate.includes(chatId)) {
            timePrivate.push(chatId);
          }
        } catch (error) {
          console.error(`Gagal mengirimkan notifikasi ke ${nomorTujuan}: ${error.message}`);
        }
      }
    }

    global.db.data.others.timePrivate = timePrivate;
    global.db.data.others.notipPrivate = notipPrivate;
  }
}

async function notifGcStore(conn) {
    setInterval(async () => {
        const currentTime = moment().tz('Asia/Jakarta').format('HH:mm');
        if (currentTime === waktuOpenStore ) {
    const teksBuka = ` ${gris1}🌟 *STORE BUKA* 🌟\nHalo semuanya! Admin panel kini sudah *ON*. Jika ingin membeli panel, silakan segera hubungi admin di nomor *6281316643491*. Terima kasih telah menggunakan layanan kami!${gris1}`;
            try {
      await conn.groupSettingUpdate(idGcStore, "not_announcement");
              await conn.sendMessage(idGcStore, { text: teksBuka });
                console.log("Pemberitahuan buka berhasil dikirim!");
            } catch (error) {
                console.error(`Gagal mengirim pemberitahuan buka: ${error.message}`);
            }
        }
        if (currentTime === waktuCloseStore ) {
            const teksTutup = ` ${gris1} *STORE TUTUP* \nHalo semuanya! Store telah *DITUTUP* untuk hari ini. Admin tidak menerima pembelian saat ini. Silakan tunggu hingga jam buka kembali. Terima kasih atas pengertian Anda!${gris1}`;
            try {
     // Tutup grup
          await conn.groupSettingUpdate(idGcStore, "announcement");
          await conn.sendMessage(idGcStore, { text: teksTutup });
                console.log("Pemberitahuan tutup berhasil dikirim!");
            } catch (error) {
                console.error(`Gagal mengirim pemberitahuan tutup: ${error.message}`);
            }
        }
    }, 60 * 1000); // Periksa setiap 1 menit
}


async function notifSholatJumat(conn) {
    setInterval(async () => {
        const currentTime = moment().tz('Asia/Jakarta');
        const dayOfWeek = currentTime.format('dddd'); // Mendapatkan nama hari (contoh: Jumat)
        const currentTimeFormatted = currentTime.format('HH:mm'); // Format waktu menjadi HH:mm

        // Notifikasi akan dikirim hanya pada hari Jumat pukul 11:00 untuk Sholat Jumat
        if (dayOfWeek === "Jumat" && currentTimeFormatted === "11:00") {
            const teksSholatJumat = `🌙 *Pemberitahuan Sholat Jumat* 🌙\nHalo semuanya! Jangan lupa untuk melaksanakan *Sholat Jumat* hari ini. Bersiaplah sebelum adzan berkumandang. Semoga amal ibadah kita diterima oleh Allah SWT. 🙏`;

            try {
                await conn.groupSettingUpdate(idGcBot, 'announcement');
                await conn.sendMessage(idGcBot, { text: teksSholatJumat });
                console.log("Notifikasi Sholat Jumat berhasil dikirim!");
            } catch (error) {
                console.error(`Gagal mengirim notifikasi Sholat Jumat: ${error.message}`);
            }
        }

        // Notifikasi untuk Sholat Jumat pada jam 1 siang
        if (currentTimeFormatted === "13:00") {
            const teksSholatJumatSiang = `Hallo semuanya, gimana Sholat Jum'at nya? Sudah beres? Sekarang grup telah dibuka kembali.`;

            try {
                await conn.groupSettingUpdate(idGcBot, 'not_announcement');
                await conn.sendMessage(idGcBot, { text: teksSholatJumatSiang });
                console.log("Notifikasi Sholat Jumat Siang berhasil dikirim!");
            } catch (error) {
                console.error(`Gagal mengirim notifikasi Sholat Jumat Siang: ${error.message}`);
            }
        }

    }, 60 * 1000); // Periksa setiap 1 menit
}

async function autoNotifSholat(conn) {
  const notifSholat = global.db.data.others?.notifSholat || {};
  const autonotifSholat = global.db.data.others?.autonotifSholat || {};
  
  
  const imgSholat = {
    shubuh: 'https://pomf2.lain.la/f/a8kx7qr5.jpg',
    dzuhur: 'https://pomf2.lain.la/f/t7m10ph5.jpg',
    ashar: 'https://pomf2.lain.la/f/dn8n9y5s.jpg',
    magrib: 'https://pomf2.lain.la/f/gql8sri.jpg',
    isya: 'https://pomf2.lain.la/f/b46jiomf.jpg',
  };

  const groupIds = Object.keys(notifSholat);
  const now = moment().tz("Asia/Jakarta").format("HH:mm");

  for (const groupId of groupIds) {
    const isAutonotifActive = autonotifSholat[groupId]?.status;
    if (!isAutonotifActive) continue; // Skip jika auto-notifikasi tidak aktif

    const jadwalSholat = notifSholat[groupId];
    if (!jadwalSholat) continue;

    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
      if (now === waktu) {
        try {
          const groupMetadata = await conn.groupMetadata(groupId).catch(() => null);
          if (!groupMetadata) continue;
          const mems = groupMetadata.participants.map((participant) => participant.id);
          const groupName = groupMetadata?.subject || "Grup";

          const thumbnailUrl = imgSholat[sholat] || 'https://pomf2.lain.la/f/fm7dfpvc.jpg'; // Gunakan fallback jika tidak ada gambar

          const contextInfo = {
            externalAdReply: {
              title: `Hai Anggota grup ${groupName}`,
              body: `Waktu ${sholat.toUpperCase()} telah tiba. Ambil wudhu dan tunaikan sholat ya! 😊`,
              mediaType: 1,
              thumbnailUrl,
              sourceUrl: "https://instagram.com/ehanzdhoanx",
              renderLargerThumbnail: true,
            },
          };

          await conn.sendMessage(groupId, {
            audio: { url: 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ' },
            mimetype: "audio/mp4",
            ptt: true,
            contextInfo,
            mentionedJid: mems,
          });

          console.log(`Notifikasi sholat '${sholat}' dikirim ke grup ${groupName} (${groupId})`);
        } catch (error) {
          console.error(`Gagal mengirim notifikasi '${sholat}' ke grup ${groupId}:`, error);
        }
      }
    }
  }
}

async function autoSholat(conn) {
  const notifSholat = global.db.data.others?.notifSholat || {};
  const autoSholat = global.db.data.others?.autoSholat || {};

  const groupIds = Object.keys(notifSholat); 
  const now = moment().tz("Asia/Jakarta").format("HH:mm");

  for (const groupId of groupIds) {
    const isAutoSholatActive = autoSholat[groupId]?.status; 
    if (!isAutoSholatActive) continue; 

    const jadwalSholat = notifSholat[groupId];
    if (!jadwalSholat) continue; 

    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
      if (now === waktu) {
        try {
          const groupMetadata = await conn.groupMetadata(groupId).catch(() => null);
          if (!groupMetadata) continue;

          const groupName = groupMetadata?.subject || "Grup";
          const teksTutup = `${gris1}🔒 *AUTO SHOLAT* \n\nGrup *${groupName}* telah ditutup selama 5 menit untuk menghormati waktu *${sholat.toUpperCase()}*. Silakan ambil wudhu dan tunaikan sholat! 😊\n\n⏰ *${waktu}*${gris1}`;
          const teksBuka = `${gris1}🔓 *AUTO SHOLAT* \n\nGrup *${groupName}* telah dibuka kembali. Semoga ibadah kalian diterima! 🙏${gris1}`;

          // Tutup grup
          await conn.groupSettingUpdate(groupId, "announcement");
          await conn.sendMessage(groupId, { text: teksTutup });

          console.log(`Grup '${groupName}' ditutup untuk waktu sholat '${sholat}' (${waktu})`);
          setTimeout(async () => {
            try {
          
              await conn.groupSettingUpdate(groupId, "not_announcement");
              await conn.sendMessage(groupId, { text: teksBuka });

              console.log(`Grup '${groupName}' dibuka kembali setelah waktu sholat '${sholat}'`);
            } catch (err) {
              console.error(`Gagal membuka grup '${groupName}' setelah waktu sholat '${sholat}':`, err);
            }
          }, 300000); 
        } catch (error) {
          console.error(`Gagal mengatur grup '${groupId}' untuk waktu sholat '${sholat}':`, error);
        }
      }
    }
  }
}







async function autoSendTugas(conn) {
  const tugasFilePath = "./database/tugas.json";
const mediaFolder = "./database/tugas_media";


function loadDataTugas() {
  return fs.existsSync(tugasFilePath) ? JSON.parse(fs.readFileSync(tugasFilePath)) : [];
}
  const dataTugas = loadDataTugas(); 
  const now = moment().tz("Asia/Jakarta").format("HH:mm"); 

  for (const task of dataTugas) {
    if (task.time === now) {
      try {
    let groupMetadata = await conn.groupMetadata(task.chatId).catch(() => null);
 if (!groupMetadata) continue;
 let mems = groupMetadata ? groupMetadata.participants.map(participant => participant.id) : [];    
 let message = `${gris1}✨ *Informasi Tugas Baru* ✨

📅 *Waktu*: ${task.time}  
📌 *Nama Tugas*: "${task.taskName}"  
👥 *Grup*: ${task.groupName}  

📝 *Deskripsi Tugas*:  
"${task.message}"

🔔 Jangan lupa selesaikan tepat waktu!${gris1}`;
        let mediaPath = task.media ? path.resolve(task.media) : null;

        if (mediaPath && fs.existsSync(mediaPath)) {
          const mediaBuffer = fs.readFileSync(mediaPath);
          const mimeType = mediaPath.split(".").pop().toLowerCase(); 

        
          if (["jpg", "jpeg", "png"].includes(mimeType)) {
            await conn.sendMessage(task.chatId, { image: mediaBuffer, caption: message,contextInfo: { mentionedJid: mems } });
          } else if (["mp4"].includes(mimeType)) {
            await conn.sendMessage(task.chatId, { video: mediaBuffer, caption: message,contextInfo: { mentionedJid: mems }
        }); 
          } else if (["mp3", "mpeg", "m4a", "opus"].includes(mimeType)) {
            await conn.sendMessage(task.chatId, {
              audio: mediaBuffer,
              mimetype: `audio/${mimeType}`,
            });
            await conn.sendMessage(task.chatId, { text: message,contextInfo: { mentionedJid: mems }
        }); 
          } else if (["webp"].includes(mimeType)) {
            await conn.sendMessage(task.chatId, { sticker: mediaBuffer });
            await conn.sendMessage(task.chatId, { text: message,contextInfo: { mentionedJid: mems }
        });  
          } else {
            await conn.sendMessage(task.chatId, {
              document: mediaBuffer,
              fileName: path.basename(mediaPath),
            });
            await conn.sendMessage(task.chatId, { text: message,contextInfo: { mentionedJid: mems }
        });  
          }
        } else {
          console.warn(`Media untuk tugas "${task.taskName}" tidak ditemukan di ${mediaPath}.`);
          await conn.sendMessage(task.chatId, {
            text: `📅 *Tugas "${task.taskName}"*:\n${task.message}\n\n🔎 Media tidak Ada.`,contextInfo: { mentionedJid: mems }
          });
        }

        console.log(`Tugas "${task.taskName}" berhasil dikirim ke grup ${task.chatId}`);
      } catch (error) {
        console.error(`Gagal mengirim tugas "${task.taskName}" ke grup ${task.chatId}:`, error);
      }
    }
  }
}

async function updateGempa(conn) {
  try {
    let gempa = global.db.data.others.updateGempa;
    let data1 = global.db.data.others.infogempa;
  
    if (!gempa) global.db.data.others.updateGempa = [];

    if (gempa && gempa.length > 0) {
      setInterval(async () => {
        const { data } = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");

        let nana = /TimurLaut|Tenggara|BaratDaya|BaratLaut|Utara|Timur|Selatan|Barat/;
        let lokasi = data.Infogempa.gempa.Wilayah;
        let waktu = data.Infogempa.gempa.Jam;

        let caption = `*📢 INFO GEMPA TERKINI 📢*

📅 *Tanggal:* ${data.Infogempa.gempa.Tanggal}
⏰ *Waktu:* ${data.Infogempa.gempa.Jam}
📍 *Koordinat:* ${data.Infogempa.gempa.Coordinates}
💥 *Magnitudo:* ${data.Infogempa.gempa.Magnitude}
🌊 *Kedalaman:* ${data.Infogempa.gempa.Kedalaman}
📌 *Lokasi:* ${data.Infogempa.gempa.Wilayah}
⚠️ *Potensi:* ${data.Infogempa.gempa.Potensi}
📡 *Dirasakan di:* ${data.Infogempa.gempa.Dirasakan}

*Catatan:*
_Untuk menonaktifkan fitur pembaruan otomatis mengenai gempa, silakan ketik_ *.updategempa off*

🌍 *Tetap waspada dan jaga keselamatan diri!*`;
 if (data1) {
          let getGroups = await conn.groupFetchAllParticipating();
          let groups = Object.entries(getGroups).map(entry => entry[1]);
          let groupIds = groups.map(v => v.id);
          let image = { url: "https://data.bmkg.go.id/DataMKG/TEWS/" + data.Infogempa.gempa.Shakemap };

          if (data1.lokasi !== lokasi && data1.waktu !== waktu) {
            data1.lokasi = lokasi;
            data1.waktu = waktu;

            for (let groupId of gempa) {
              if (!groupIds.includes(groupId)) {
                gempa.splice(gempa.indexOf(groupId), 1); 
                console.log("Menghapus auto update gempa pada grup");
              } else {
                await sleep(3000);
                await conn.sendMessage(groupId, { image, caption });
              }
            }
          }
        } else {
          let getGroups = await conn.groupFetchAllParticipating();
          let groups = Object.entries(getGroups).map(entry => entry[1]);
          let groupIds = groups.map(v => v.id);
          let image = { url: "https://data.bmkg.go.id/DataMKG/TEWS/" + data.Infogempa.gempa.Shakemap };

          global.db.data.others.infogempa = {
            lokasi: lokasi,
            waktu: waktu
          };
for (let groupId of gempa) {
            if (!groupIds.includes(groupId)) {
              gempa.splice(gempa.indexOf(groupId), 1); 
              console.log("Menghapus auto update gempa pada grup");
            } else {
              await sleep(3000);
              await conn.sendMessage(groupId, { image, caption });
            }
          }
        }
      }, 60_000 * 10); // Interval pembaruan setiap 10 menit
    }

  } catch (err) {
    console.error("Error in mainFunction:", err);
  }
}


















module.exports = { autoOpenCloseGc,notifGcAlarm,notifSholatJumat,notifPrivate,notifGcStore,autoNotifSholat,autoSholat,autoSendTugas};