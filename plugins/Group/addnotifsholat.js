let handler = async (m, { text, isAdmin, setReply }) => {
  const args = text.trim().split("|");
  if (args.length !== 5) {
    return setReply(
      "Format salah! Gunakan:\n.addnotifsholat <shubuh>|<dzuhur>|<ashar>|<magrib>|<isya>\n" +
      "Contoh:\n.addnotifsholat 04:29|12:02|15:15|17:52|19:01"
    );
  }
const namaGc = m.groupName;
  const jadwalSholat = {
    namaGc: namaGc,
    shubuh: args[0],
    dzuhur: args[1],
    ashar: args[2],
    magrib: args[3],
    isya: args[4],
  };
    
    

  if (!global.db.data.others) global.db.data.others = {};
  if (!global.db.data.others.notifSholat) global.db.data.others.notifSholat = {};

  const chatId = m.chat;
  global.db.data.others.notifSholat[chatId] = jadwalSholat;

  setReply(
    `✅ Jadwal sholat untuk grup ${namaGc} ini berhasil diperbarui:\n` +
    `Shubuh: ${jadwalSholat.shubuh}\n` +
   `Dzuhur: ${jadwalSholat.dzuhur}\n` +
    `Ashar: ${jadwalSholat.ashar}\n` +
    `Magrib: ${jadwalSholat.magrib}\n` +
    `Isya: ${jadwalSholat.isya}

Jika Sudah Mengisi Jadwal Sholat Silahkan Untuk Mengaktifkan *.autonotifsholat* nya Agar Menhera Dapat Otomatis Memberitahu Kan Notif Jadwal Sholat`
  );
};
   
   

handler.tags = ["admin"];
handler.command = ["addnotifsholat","setnotifsholat"];
handler.onlyGroup = true;
handler.admin = true;

module.exports = handler;