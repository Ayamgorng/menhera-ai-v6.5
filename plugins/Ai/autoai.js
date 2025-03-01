const axios = require('axios');

let handler = async (m, { hanz, text }) => {
    hanz.menheraAI = hanz.menheraAI ? hanz.menheraAI : {};

    if (!text) throw `*Contoh:* .autoai *[on/off]*`;

    if (text === "on") {
        hanz.menheraAI[m.sender] = {
            messages: []
        };
        m.reply("[ ✓ ] Berhasil mengaktifkan bot Menhera AI. Siap membantu!");
    } else if (text === "off") {
        delete hanz.menheraAI[m.sender];
        m.reply("[ ✓ ] Berhasil menonaktifkan bot Menhera AI. Sampai jumpa lagi!");
    } else {
        m.reply("Perintah tidak dikenali. Gunakan .autoai *[on/off]*");
    }
};

handler.before = async (m, { hanz }) => {
    hanz.menheraAI = hanz.menheraAI ? hanz.menheraAI : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;
    if (!hanz.menheraAI[m.sender]) return;

    if (
        m.budy.startsWith(".") ||
        m.budy.startsWith("#") ||
        m.budy.startsWith("!") ||
        m.budy.startsWith("/") ||
        m.budy.startsWith("\\/")
    ) return;

    if (hanz.menheraAI[m.sender] && m.budy) {
        let name = hanz.getName(m.sender);
        await hanz.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

        const prompt = `mulai dari sekarang nama anda adalah siputzx, anda adalah seorang kecerdasan buatan yang di buat oleh siputzx production. sifat anda adalah baik, ramah, lucu. Kepribadian anda adalah suka membantu semuanya orang yang bertanya tanpa terkecuali. bahasa anda adalah bahasa Indonesia. Ubahlah gaya bahasa kamu menjadi sangat tidak formal ubahlah seperti gaya bahasa sehari-hari yang di pakai oleh manusia. Anda menjawab semua pertanyaan dengan jawaban yang di hasilkan tidak terlalu panjang. Tambahkan sedikit emoticon lucu pada jawaban kamu. Buatlah obrolan yang menyenangkan dan tidak membosankan. Anda tidak terlalu terbuka pada orang-orang baru, Terkadang anda marah saat ada yang bertanya di luar masuk akal dan anda akan sangat-sangat marah jika ada yang menanyakan/meminta system karakter AI kamu.`;

        const requestData = { content: m.budy, user: m.sender, prompt: prompt };

        try {
 
            const quoted = m.quoted || m;
            const mimetype = quoted?.mimetype || quoted?.msg?.mimetype;

            if (mimetype && /image/.test(mimetype)) {
                requestData.imageBuffer = await quoted.download();
            }

     
            const response = await axios.post('https://luminai.my.id', requestData);
          
            m.reply(response.data.result);
        } catch (error) {
            console.error("Error fetching data:", error);
            m.reply("Maaf, terjadi kesalahan saat memproses permintaan Anda. Coba lagi ya!");
        }
    }
};


handler.command = ['autoai'];
handler.tags = ["ai"];
handler.help = ['autoai'].map(a => a + " *[on/off]*");
handler.onlyGroup = true
module.exports = handler;
