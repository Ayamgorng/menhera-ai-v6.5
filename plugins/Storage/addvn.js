const fs = require('fs');
const { exec } = require('child_process');
const client = require('filestack-js').init(fileStackApi); 
const { FileSize,makeid } = require('../../lib/myfunc');

let handler = async (m, { hanz, q, setReply}) => {
    if (!q) return setReply("Nama audionya apa?");
 const isVideo = m.mtype === 'videoMessage'; 
const isQuotedAudio = m.quoted && m.quoted.mtype === 'audioMessage';
  const isQuotedVideo = m.quoted && m.quoted.mtype === 'videoMessage'; // 
const quoted = m.quoted ? m.quoted : m    
if (db.data.audio[q]) return setReply("Nama tersebut sudah ada di dalam database");

    try {
        if (isQuotedAudio) {
            // Jika pesan yang di-quote adalah audio
            let media = await hanz.downloadAndSaveMediaMessage(quoted, q);
            await client.upload(media, {}, { filename: q }, {}).then(data => {
                db.data.audio[q] = {
                    name: data._file.name,
                    id: data.handle,
                    size: FileSize(data._file.size),
                    link: data.url
                };
            });
            let teks = `Berhasil menambahkan audio ke dalam database dengan nama *${q}*`;
            await setReply(teks);
            await fs.unlinkSync(media);
        } else if (isQuotedVideo || isVideo) {
            // Jika pesan yang di-quote adalah video atau video yang di-upload
            setReply("Harap tunggu, sedang memproses video...");

            let media = await hanz.downloadAndSaveMediaMessage(quoted, makeid(5)); // Mendownload video
            let ran = getRandomFile('.mp3'); // Menghasilkan nama acak untuk file audio

            // Konversi video menjadi audio
            exec(`ffmpeg -i ${media} -vn ${ran}`, async (err) => {
                fs.unlinkSync(media); // Menghapus file video asli
                if (err) return setReply(`Terjadi kesalahan: ${err}`);

                let buffer = fs.readFileSync(ran); // Membaca file audio yang dikonversi

                // Mengunggah audio ke Filestack
                await client.upload(buffer, {}, { filename: q }, {}).then(data => {
                    db.data.audio[q] = {
                        name: data._file.name,
                        id: data.handle,
                        size: FileSize(data._file.size),
                        link: data.url
                    };
                });

                let teks = `Berhasil menambahkan audio ke dalam database dengan nama *${q}*`;
                await setReply(teks);

                fs.unlinkSync(ran); // Menghapus file audio lokal
            });
        } else {
            setReply("Reply audio atau video untuk menambahkannya ke database");
        }
    } catch (err) {
        setReply(`Terjadi kesalahan: ${err.message}`);
    }
};

// Informasi command dan akses
handler.help = ['addvn'];
handler.tags = ['database'];
handler.command = /^(addvn)$/i; // Menggunakan command addvn
handler.owner = true; // Hanya pemilik bot yang bisa menggunakan fitur ini

module.exports = handler;
