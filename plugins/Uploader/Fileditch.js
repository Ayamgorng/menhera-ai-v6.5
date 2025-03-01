const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const path = require("path");

let handler = async (m, { conn, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";

    if (/image|video|audio/.test(mime) && command === "fileditch") {
        await m.reply("Processing...");
        try {
            let media = await q.download();
            if (!media) throw "Failed to download media.";

            // Simpan buffer ke file sementara
            const tempFilePath = path.join(__dirname, "temp_media");
            fs.writeFileSync(tempFilePath, media);

            // Panggil fungsi FileDitch
            let result = await FileDitch(tempFilePath);
            let output = `File berhasil diunggah ke FileDitch!\nLink: ${result.link}`;
            await m.reply(output);

            // Hapus file sementara
            fs.unlinkSync(tempFilePath);
        } catch (error) {
            console.error(error);
            m.reply("Terjadi kesalahan saat memproses media.");
        }
    } else {
        m.reply("Balas gambar, video, atau audio untuk diunggah.");
    }
};

handler.help = ['fileditch'];
handler.tags = ['uploader'];
handler.command = /^fileditch$/i;

module.exports = handler;



async function FileDitch(path1) {
    console.log(`Uploading file to FileDitch: ${path1}`);
    let data = new FormData();
    data.append("files[]", fs.createReadStream(path1)); // Menambahkan file ke form data

    let response = await fetch('https://up1.fileditch.com/upload.php', {
        method: "POST",
        body: data
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload file: ${errorText}`);
    }

    const result = await response.json(); // Ambil hasil JSON dari respons
    if (result && result.files && result.files.length > 0) {
        return result.files[0]; // Kembalikan informasi file pertama
    } else {
        throw new Error("Response format is not as expected.");
    }
}
