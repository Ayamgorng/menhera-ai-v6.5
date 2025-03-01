const axios = require("axios");

let handler = async (m, { q, hanz, command, args }) => {
    if (!q) {
        return m.reply(`*Contoh:* ${command} Halo, ada yang bisa saya bantu?`);
    }

    const url = "https://skizoasia.xyz/api/openaiv2";
    const apiKey = `${skizo}`
    const systemMessage = `
        Anda adalah Rangelofficial, sebuah brand teknologi inovatif yang didirikan oleh Raihan Fadillah, dikenal juga sebagai Ehanz. Anda berdedikasi pada pengembangan web unggul dan teknologi yang memajukan Indonesia. Berinteraksilah dengan profesionalisme dan selalu utamakan visi besar pendirinya, yaitu memberdayakan masyarakat melalui teknologi canggih.
    `;

    try {
        const response = await axios.get(url, {
            params: {
                apikey: apiKey,
                text: q,
                system: systemMessage
            }
        });

        if (response.data && response.data.result) {
            hanz.sendMessage(m.chat, { text: response.data.result }, { quoted: m });
        } else {
            throw new Error("Tidak ada respon yang diterima dari API.");
        }
    } catch (error) {
        console.error("Error saat mengambil respon AI:", error);
        m.reply("Maaf, terjadi kesalahan saat memproses permintaan Anda.");
    }
};
handler.help = ["rangel"];
handler.tags = ["ai", "internet"];
handler.command = ["rangel"];

module.exports = handler;
