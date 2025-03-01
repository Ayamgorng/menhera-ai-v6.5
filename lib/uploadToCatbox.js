const axios = require('axios');
const FormData = require('form-data');

/**
 * Fungsi untuk mengunggah file ke Catbox
 * @param {Buffer} content - Konten file yang akan diunggah
 * @returns {Promise<string>} - URL file yang diunggah
 */
async function uploadToCatbox(content) {
  try {
    // Membuat nama file berdasarkan timestamp
    const fileName = `${Date.now()}.bin`;  // Menambahkan ekstensi 'bin' atau ganti sesuai kebutuhan

    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', content, fileName);

    const response = await axios.post('https://catbox.moe/user/api.php', formData, {
      headers: formData.getHeaders(),
    });

    if (response.status !== 200 || !response.data) {
      throw new Error('Gagal mengunggah ke Catbox');
    }
    return response.data; // Mengembalikan URL file
  } catch (error) {
    console.error('Error uploading to Catbox:', error.message);
    throw error;
  }
}

module.exports = uploadToCatbox 