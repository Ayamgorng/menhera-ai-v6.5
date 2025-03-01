const axios = require('axios');

let handler = async (m, { q, reply, setReply }) => {
    if (!q) return reply('Lokasi apa yang ingin Anda cari?');

    try {
        let wdata = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=id`
        );

        // Format cuaca
        let textw = "";
        textw += `*🗺️ Cuaca di ${q}*\n\n`;
        textw += `*Cuaca:* ${wdata.data.weather[0].main}\n`;
        textw += `*Deskripsi:* ${wdata.data.weather[0].description}\n`;
        textw += `*Suhu Rata-rata:* ${wdata.data.main.temp}°C\n`;
        textw += `*Suhu Terasa:* ${wdata.data.main.feels_like}°C\n`;
        textw += `*Tekanan:* ${wdata.data.main.pressure} hPa\n`;
        textw += `*Kelembapan:* ${wdata.data.main.humidity}%\n`;
        textw += `*Kecepatan Angin:* ${wdata.data.wind.speed} m/s\n`;
        textw += `*Garis Lintang:* ${wdata.data.coord.lat}\n`;
        textw += `*Garis Bujur:* ${wdata.data.coord.lon}\n`;
        textw += `*Negara:* ${wdata.data.sys.country}\n`;

        // Kirim data cuaca
        setReply(textw);

    } catch (error) {
        console.error(error);
        reply(`*Terjadi kesalahan saat mengambil data cuaca.*\nSilakan coba lagi nanti.`);
    }
};

handler.help = ["cuaca"];
handler.tags = ["info"];
handler.command = ["cuaca", "weather","infocuaca"];

module.exports = handler;
