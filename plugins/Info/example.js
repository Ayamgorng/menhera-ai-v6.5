let handler = async (m, { setReply }) => {

  let contohFitur = `
  Hai ${m.pushname}, berikut adalah contoh sederhana untuk membuat fitur di bot ini:

  **Contoh Implementasi Fitur**:
  \`\`\`
  let handler = async (m, { setReply }) => {
    let contohTeks = 'Hai Ini Tes Fitur';
    m.reply(contohTeks);
  };
  handler.help = ["example"];  // Info bantuan
  handler.tags = ["user"];  // Kategori fitur
  handler.register = true;  // Harus daftar untuk menggunakan fitur ini
  handler.command = ["example"];  // Nama perintah
  handler.owner = true;  // Hanya bisa diakses oleh pemilik bot
  handler.premium = true;  // Hanya pengguna premium yang bisa mengakses
  handler.nsfw = true;  // Fitur NSFW harus diaktifkan terlebih dahulu
  handler.game = true;  // Fitur game harus diaktifkan terlebih dahulu
 handler.rpg = true;  // Fitur rpg harus diaktifkan terlebih dahulu
  handler.private = true;  // Hanya bisa diakses di chat pribadi
  handler.group = true;  // Hanya bisa diakses di grup
  handler.onlyGroup = true;  // Hanya bisa diakses di grup, tidak di chat pribadi
  handler.selerpanel = true;  // Hanya anggota panel reseller yang bisa mengakses
  handler.cmdStore = true;  // Hanya bisa diakses di grup store
  handler.description = ["Deskripsi fitur"];  // Deskripsi fitur lebih lanjut
module.exports = handler; // mengexpor fitur 
  \`\`\`

  **Penjelasan**:
  - \`handler.help\`: Menyediakan info bantuan terkait fitur ini.
  - \`handler.tags\`: Kategori atau tag untuk fitur ini.
  - \`handler.register\`: Menandakan apakah pengguna perlu terdaftar terlebih dahulu.
  - \`handler.owner\`: Hanya pemilik bot yang dapat menggunakan fitur ini.
  - \`handler.premium\`: Hanya pengguna premium yang dapat mengakses.
  - \`handler.nsfw\`: Mengaktifkan pengecekan fitur NSFW.
  - \`handler.game\`: Menandakan bahwa fitur game harus diaktifkan terlebih dahulu.
   - \`handler.rpg\`: Menandakan bahwa fitur rpg harus diaktifkan terlebih dahulu.
  - \`handler.private\`: Membatasi akses fitur hanya untuk pesan pribadi.
  - \`handler.group\`: Fitur hanya bisa digunakan di grup.
  - \`handler.onlyGroup\`: Membatasi akses hanya di grup atau chat pribadi.
  - \`handler.selerpanel\`: Hanya anggota reseller panel yang dapat mengakses.
  - \`handler.cmdStore\`: Fitur ini hanya bisa digunakan di grup store.
  - \`handler.description\`: Deskripsi lebih lanjut tentang fitur tersebut.

  **Semoga ini membantu kamu untuk memahami cara membuat dan mengatur fitur pada Bot Menhera!**
  *Dari Tim Rangelofficial*`;

  m.reply(contohFitur);

};

handler.help = ["intro"];
handler.tags = ["group"];
handler.command = ["example"];


module.exports = handler;