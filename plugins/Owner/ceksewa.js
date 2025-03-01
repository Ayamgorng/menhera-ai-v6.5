const ms = require('parse-ms');
const moment = require('moment-timezone');

const handler = async (m, { hanz, args, setReply, usedPrefix, command }) => {
  let chat = db.data.chats[m.chat];
  
  if (!m.isGroup) return setReply(mess.only.group);
  if (chat.expired == 0) return setReply(`Grup ini tidak terdaftar dalam list sewa bot. Ketik .sewabot untuk info lebih lanjut`);

  let { id, subject, creation, desc, descId, participants, owner, subjectOwner } = await conn.groupMetadata(m.chat);
  let cekid = ms(chat.expired - Date.now());
  let tagnya = owner === undefined ? subjectOwner : owner;
  let creator = `${owner === undefined ? (subjectOwner === undefined ? 'Tidak ada' : "@" + subjectOwner.split("@")[0]) : "@" + owner.split("@")[0]}`;
  let member = participants;
  let admin = member.filter(u => u.admin === 'admin' || u.admin === 'superadmin');
  let cekbulan = Math.floor(cekid.days / 30);
  
  let teks = `
✨ *DETAIL SEWA BOT* ✨

📌 *Informasi Grup*
• 📛 *Nama Grup:* ${m.groupName}
• 🗓️ *Dibuat Pada:* ${new Date(creation * 1000).toLocaleString()}
• 👤 *Pembuat Grup:* ${creator}
• 🆔 *ID Grup:* ${m.chat}
• 🔑 *Admin Grup:* ${admin.length}
• 👥 *Total Anggota:* ${member.length}

📅 *Status Sewa*
• ⏳ *Durasi Aktif:* ${cekbulan} Bulan ${cekid.days - cekbulan * 30} Hari, ${cekid.hours} Jam, ${cekid.minutes} Menit
• 📆 *Waktu Mulai:* ${chat.timeOrder}
• 🕒 *Waktu Berakhir:* ${chat.timeEnd}
• 📉 *Sisa Waktu:* ${chat.expired - Date.now()}

💡 *Catatan Penting*
• Ketik *.menu* untuk membuka daftar fitur bot.
• Ketik *.ceksewa* untuk memeriksa sisa waktu sewa.
• Hubungi owner jika terdapat kendala atau ingin memperpanjang sewa bot.
• Owner: wa.me/${nomerOwner}

✨ Tetap semangat dan nikmati layanan kami! ✨
${copyright} - ${calender}`;


  hanz.sendMessage(m.chat, { text: teks, mentions: [tagnya] }, { quoted: m });
};

handler.help = ['cekexpired'];
handler.tags = ['group'];
handler.command = ['ceksewa','sewacek'];
handler.group = true;

module.exports = handler;
