const axios = require('axios');

// API Key SerpApi g tua expired atau engga 👀
const API_KEY = 'f6313a796871b466ed970c257935f0d5b512caa7f0619516d7444aa22bf4b6e0';


async function getGoogleImages(query) {
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&tbm=isch&api_key=${API_KEY}`;

    try {
        const { data } = await axios.get(url);
        
        if (data.images_results && data.images_results.length > 0) {
            const firstImageUrl = data.images_results[0].thumbnail;
            return firstImageUrl;
        } else {
            throw "Gambar tidak ditemukan.";
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}


let handler = async (m, { text, q, hanz, setReply }) => {
    if (!q) throw "Harap masukkan query pencarian gambar!";
    
    
    const imageUrl = await getGoogleImages(q);

    if (imageUrl) {
        hanz.sendMessage(m.chat, { image: { url: imageUrl }, caption: `Gambar dari pencarian: ${q}` }, { quoted: m });
    } else {
        setReply('Gagal mendapatkan gambar. Coba lagi nanti.');
    }
};


handler.command = ["gimage"];
handler.owner = false; 
handler.help = ['gimage <query>'];
handler.tags = ['search'];

module.exports = handler;



