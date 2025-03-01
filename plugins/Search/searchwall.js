let handler = async (m, { text }) => {
  const axios = require('axios');
  
  const api = 'https://plte.link/aiwallpapers/api';
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Postify/1.0.0"
  };

  // Fungsi untuk mengambil data wallpaper
  async function searchWallpaper(query) {
    try {
      const { data } = await axios.get(`${api}/search`, {
        params: {
          user_id: '550e8400-e29b-41d4-a716-446655440000',
          order_by: 'created_at',
          search: query
        },
        headers: headers
      });
      return data;
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
      throw error;
    }
  }

  const query = text.trim() || 'patrick'; // Default kata kunci
  try {
    const result = await searchWallpaper(query);

    // Jika tidak ada data ditemukan
    if (!result.data || result.data.length === 0) {
      const suggestion = `
Maaf, tidak ada wallpaper ditemukan untuk kata kunci "${query}".
Coba gunakan kata kunci populer seperti:
- *Abstract*
- *Nature*
- *Technology*

Atau kunjungi link berikut untuk mencari lebih lanjut:
- Halaman Pencarian: ${result.first_page_url}`;

      m.reply(suggestion);
      return;
    }

    // Jika data ditemukan, format hasilnya
    const messages = result.data.slice(0, 5).map(wp => (
      `📌 *Title*: ${wp.title}\n` +
      `📖 *Description*: ${wp.description || 'Tidak ada'}\n` +
      `📷 *Image*: ${wp.image}\n` +
      `🖼 *Thumbnail*: ${wp.thumbnail}\n` +
      `👍 *Likes*: ${wp.likes}\n` +
      `👁 *Views*: ${wp.views}\n` +
      `⬇️ *Downloads*: ${wp.downloads}\n` +
      `🔖 *Tags*: ${wp.tags.join(', ')}\n` +
      `📏 *Resolution*: ${wp.resolution}\n` +
      `📂 *Category*: ${wp.category_name || 'Tidak ada'}\n`
    )).join('\n\n');

    m.reply(messages);

  } catch (error) {
    m.reply('Terjadi kesalahan saat mencari wallpaper.');
  }
};

handler.help = ['searchwall <query>'];
handler.tags = ['wallpaper'];
handler.command = /^searchwall$/i;

module.exports = handler;
        
  