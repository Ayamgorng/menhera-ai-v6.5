const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { q }) => {
    if (!q) return m.reply('Silakan berikan URL yang ingin dibaca. 📄');

    async function baca(url) {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            let penjelasanLengkap = '';
            let hakCiptaDitemukan = false;
            const hakCipta = 'Hak cipta ©';


            $('h1, h2, h3, h4, h6').each((i, element) => {
                penjelasanLengkap += `\n*${$(element).text().trim()}* \n`;
            });

          
            $('p').each((i, element) => {
                const teks = $(element).text().trim();
                if (teks.includes(hakCipta)) {
                    hakCiptaDitemukan = true;
                    return false; 
                }
                penjelasanLengkap += `${teks}\n`;
            });

            
            if (!hakCiptaDitemukan) {
                $('li').each((i, element) => {
                    if (!$(element).find('ul').length) {
                        penjelasanLengkap += `• ${$(element).text().trim()}\n`;
                    }
                });
            }

            // Menangkap konten tambahan
            if (!hakCiptaDitemukan) {
                $('div, span').each((i, element) => {
                    const teks = $(element).text().trim();
                    if (teks.length > 30) {
                        penjelasanLengkap += `${teks}\n`;
                    }
                });
            }

            return penjelasanLengkap.trim();
        } catch (error) {
            console.error('Error fetching the URL:', error);
            return 'Gagal mengambil data dari URL. ⚠️';
        }
    }

    try {
        const url = q;
        if (!url.startsWith('http')) {
            return m.reply('URL yang diberikan tidak valid. Pastikan URL dimulai dengan "http" atau "https".');
        }
        
        const konten = await baca(url);
        m.reply(konten || 'Tidak ada konten ditemukan di URL tersebut. ❌');
    } catch (error) {
        m.reply('Terjadi kesalahan saat memproses URL. Coba lagi nanti. ⚠️');
    }
};

handler.help = ["cekpenyakit"];
handler.tags = ["health"];
handler.command = ["cekpenyakit"]; 
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;
