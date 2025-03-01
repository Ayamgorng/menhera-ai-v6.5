const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

const handler = async (m, { hanz, args, text, usedPrefix, command }) => {
    text = text || (args.length ? args.join(" ") : null);
    if (!text) throw `*• Example :* ${usedPrefix + command} *[text]*`;

    async function ttp(text) {
        try {
            const response = await fetch("https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    Cookie: "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1",
                },
                body: new URLSearchParams({
                    TextToRender: text,
                    FontSize: "100",
                    Margin: "30",
                    LayoutStyle: "0",
                    TextRotation: "0",
                    TextColor: "ffffff",
                    TextTransparency: "0",
                    OutlineThickness: "3",
                    OutlineColor: "000000",
                    FontName: "Lekton",
                    ResultType: "view",
                }).toString(),
            });

            const bodyText = await response.text();
            const $ = cheerio.load(bodyText);
            const results = [];

            $('form[name="MyForm"]').each((index, formElement) => {
                const resultFile = $(formElement).find('#idResultFile').attr('value');
                const refTS = $(formElement).find('#idRefTS').attr('value');
                if (resultFile) {
                    results.push({
                        creator: 'TanakaDomp',
                        url: 'https://www.picturetopeople.org' + resultFile,
                        title: refTS
                    });
                }
            });

            return results;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

   
    const result = await ttp(text);
    if (result.length > 0) {
        const imageUrl = result[0].url;

       
        const sticker = new Sticker(imageUrl, {
            pack: "Tanaka Domp Pack",
            author: "Tanaka Domp",
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 70,
            background: '#FFFFFF00'
        });

        const stickerBuffer = await sticker.toBuffer();

     
        await hanz.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
    } else {
        m.reply("⚠️ Gagal menghasilkan TTP. Coba lagi nanti.");
    }
};

handler.command = handler.help = ['ttp'];
handler.tags = ['sticker'];
handler.noCmdStore = true  
handler.onlyGroup = true

module.exports = handler;
