const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { text }) => {
    
    if (!text) return m.reply('Masukkan teks yang ingin diubah gaya!');

   
    let anu = await styletext(text);
    
    let teks = `Gaya Teks dari "${text}":\n\n`;
    for (let i of anu) {
        teks += `*${i.name}* : ${i.result}\n\n`;
    }
    
    m.reply(teks);
};


async function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(teks))
            .then(({ data }) => {
                let $ = cheerio.load(data);
                let hasil = [];
                
                $('table > tbody > tr').each(function (a, b) {
                    hasil.push({
                        name: $(b).find('td:nth-child(1) > span').text(),
                        result: $(b).find('td:nth-child(2)').text().trim()
                    });
                });

                resolve(hasil);
            })
            .catch(err => {
                console.error("Error fetching styled text:", err);
                reject(new Error('Could not fetch styled text.'));
            });
    });
}

handler.help = ['styletext <teks>'];
handler.tags = ['tools'];
handler.command = /^styletext$/i;


module.exports = handler;
