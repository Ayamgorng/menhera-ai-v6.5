const fetch = require('node-fetch');

let handler = async (m, { hanz,setReply,text }) => {
  if (!text) throw 'Harap masukkan username GitHub.';

  try {
    // Mengambil data dari API
    let res = await fetch(`https://api.agatz.xyz/api/github?message=${encodeURIComponent(text)}`);
    let json = await res.json();

    // Memeriksa status respon dari API
    if (json.status !== 200 || !json.data || json.data.length === 0) {
      throw 'Data tidak ditemukan atau terjadi kesalahan.';
    }

    // Mengambil daftar repositori dari API
    let repos = json.data;
    let message = `Daftar Repositori untuk *${text}*:\n`;

    // Menyusun pesan dengan informasi repositori
    repos.forEach(repo => {
      message += `- Nama: ${repo.fullName}\n` +
                 `  URL: ${repo.htmlUrl}\n` +
                 `  Dibuat Pada: ${repo.createdAt}\n` +
                 `  Terakhir Diperbarui: ${repo.updatedAt}\n` +
                 `  Watchers: ${repo.watchers}\n` +
                 `  Forks: ${repo.forks}\n` +
                 `  Stars: ${repo.stargazersCount}\n` +
                 `  Open Issues: ${repo.openIssues}\n` +
                 `  Deskripsi: ${repo.description || 'Tidak ada deskripsi'}\n` +
                 `  Clone URL: ${repo.cloneUrl}\n\n`;
    });
setReply(message)
    /*/ Mengirim pesan dengan daftar repositori
    await hanz.sendMessage(m.chat, {
      text: message,
    });*/

  } catch (e) {
    // Menangani kesalahan dan mengirimkan pesan kesalahan
    await hanz.sendMessage(m.chat, `Terjadi kesalahan: ${e.message || e}`);
  }
};

// Menetapkan nama command dan tag
handler.command = ['ghsearch','githubsearch'];
handler.tags = ['info'];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;