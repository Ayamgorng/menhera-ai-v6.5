const axios = require('axios');
const fileType = require('file-type');

/**
 * Fungsi untuk mengunggah file ke repositori GitHub
 * @param {Buffer} media - Buffer dari file yang akan diunggah
 * @param {string} tokenGithub - Token GitHub untuk otentikasi
 * @returns {Promise<string>} - URL file mentah di GitHub
 */
async function uploadToGithub(media) {
  try {
    const owner = 'Rangelofficial'; // Nama pemilik repositori
    const repo = 'Uploade-db'; // Nama repositori
    const branch = 'main';

    // Penamaan file berdasarkan waktu
    const fileInfo = await fileType.fromBuffer(media);
    const ext = fileInfo ? fileInfo.ext : 'bin'; // Default ke 'bin' jika tidak ada ekstensi
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `uploader/${fileName}`;

    // Mengonversi konten file menjadi Base64
    const base64Content = Buffer.from(media).toString('base64');

    // Mengunggah file ke GitHub
    const githubResponse = await axios.put(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        message: `Upload file ${fileName}`,
        content: base64Content,
        branch: branch,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenGithub}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Mengembalikan URL file mentah
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
  } catch (error) {
    console.error('Error uploading to GitHub:', error.message);
    throw new Error('Gagal mengunggah file ke GitHub');
  }
}

module.exports = uploadToGithub 