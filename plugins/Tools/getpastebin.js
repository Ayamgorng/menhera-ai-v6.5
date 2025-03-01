// Dari Hann

const fetch = require('node-fetch');

let handler = async (m, { text, args, setReply }) => {
  const link = args[0]?.trim();
  if (!link) return setReply('Mana URL-nya? Contoh: .getpastebin https://pastebin.com/abc123');
 
  if (!/^https:\/\/pastebin\.com\/[a-zA-Z0-9]+$/.test(link)) {
    return setReply('URL tidak valid! Pastikan menggunakan URL seperti: https://pastebin.com/abc123');
  }
  const pasteId = link.split('/').pop();

  try {
    const response = await fetch(`https://pastebin.com/raw/${pasteId}`);
    if (!response.ok) {
      return setReply('Gagal mengambil isi dari Pastebin. Pastikan URL benar atau kontennya tidak dihapus.');
    }
    const content = await response.text();
    if (!content) {
      return setReply('Tidak ada isi yang ditemukan di Pastebin!');
    }
    setReply(`*Konten dari Pastebin:*\n\n${content}`);
  } catch (error) {
    console.error('Error saat mengambil data dari Pastebin:', error);
    setReply('Terjadi kesalahan saat mengambil data dari Pastebin. Silakan coba lagi nanti.');
  }
};

handler.tags = ['tools'];
handler.command = ['getpastebin']
handler.help = ['getpastebin <url>'];
handler.private = false; 

module.exports = handler;