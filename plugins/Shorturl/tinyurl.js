const { isUrl } = require('../../lib/myfunc'); 
const fetch = require('node-fetch');
let handler = async (m, { q, setReply }) => {
    if (!q) return setReply('Masukkan link');

    if (!isUrl(q)) return setReply('Masukkan link yang valid');

    const fetchText = (url, optiono) => {
        return new Promise((resolve, reject) => {
            fetch(url, optiono)
                .then(response => response.text())
                .then(text => resolve(text))
                .catch(err => {
                    console.log(`Error: ${err}`); 
                    reject(err);
                });
        });
    };

    try {
        let okok = await fetchText(`https://tinyurl.com/api-create.php?url=${q}`);
        let shorti = `*Result* : ${okok}`;
        await setReply(shorti);
    } catch (error) {
        setReply('Terjadi kesalahan saat membuat short link. ⚠️');
    }
};

handler.help = ["shorten"];
handler.tags = ["utility"];
handler.command = ["tinyurl"]; 

module.exports = handler;
