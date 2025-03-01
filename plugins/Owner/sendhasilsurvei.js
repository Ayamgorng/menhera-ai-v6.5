const fs = require('fs-extra');

let handler = async (m, { hanz, isOwner, setReply }) => {
  if (!isOwner && !m.itsMe) return setReply("❌ Fitur ini hanya dapat digunakan oleh Owner.");
  
  const filePath = './database/dataSurvei.json';

  if (!fs.existsSync(filePath)) {
    return setReply("Tidak ada data survei yang tersimpan.");
  }
  const dataSurvei = fs.readJsonSync(filePath);

  if (dataSurvei.length === 0) {
    return setReply("Tidak ada data survei yang tersimpan.");
  }
  const result = dataSurvei.reduce((acc, curr) => {
    acc[curr.choice] = (acc[curr.choice] || 0) + 1;
    return acc;
  }, {});
  const mostVoted = Object.entries(result).reduce((a, b) => (a[1] > b[1] ? a : b));

  let hasilSurvei = `*📊 Hasil Survei Terbanyak:*\n\n`;
  hasilSurvei += `➡️ Pilihan: *${mostVoted[0]}*\n`;
  hasilSurvei += `📋 Jumlah Pemilih: *${mostVoted[1]}*\n\n`;
  hasilSurvei += `_Hasil ini berdasarkan data survei yang telah dikumpulkan._`;

  const getGroups = await hanz.groupFetchAllParticipating();
  const groups = Object.entries(getGroups).map(([_, group]) => group.id);
  setReply(`Mengirimkan hasil survei ke ${groups.length} grup...`);
  for (let groupId of groups) {
    await hanz.sendMessage(groupId, { text: hasilSurvei });
  }

  setReply("✅ Hasil survei berhasil dikirim ke semua grup.");
};

handler.tags = ["admin"];
handler.command = ["sendhasilsurvei"];
handler.owner = true; 
handler.group = false; 

module.exports = handler;