const axios = require('axios');
const FormData = require('form-data');
const crypto = require('crypto');

let handler = async (m) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'Tidak ada media yang ditemukan!';

    let media = await q.download();
    if (!media) throw 'Gagal mengunduh media!';

    let ext = mime.split('/')[1] || 'bin';
    let fileName = `${crypto.randomBytes(5).toString('hex')}.${ext}`;

    let link = await uploadToCatbox(media, fileName);


    m.reply(`
*Berhasil diunggah ke Catbox:*

🔗 *Link*: ${link}
`);
  } catch (error) {
    console.error(error);
    m.reply(`Terjadi kesalahan: ${error.message}`);
  }
};

handler.help = ["tourl"];
handler.tags = ["uploader"];
handler.command = /^(tourl)$/i;
handler.limit = true;
handler.register = false;

module.exports = handler;


async function uploadToCatbox(content, fileName) {
  const formData = new FormData();
  formData.append('reqtype', 'fileupload');
  formData.append('fileToUpload', content, fileName); 

  const response = await axios.post('https://catbox.moe/user/api.php', formData, {
    headers: formData.getHeaders(),
  });

  if (response.status !== 200 || !response.data) {
    throw new Error('Gagal mengunggah ke Catbox');
  }
return response.data;
}
