const fetch = require('node-fetch');
const axios = require('axios'); 
const cheerio = require('cheerio'); 

const handler = async (m, { text, usedPrefix, command }) => {

  const q = text;
  if (!q) return m.reply(`Example: ${usedPrefix + command} anak`);

 
  async function cerpen(category) {
    return new Promise((resolve, reject) => {
      let title = category.toLowerCase().replace(/[()*]/g, "");
      let judul = title.replace(/\s/g, "-");
      let page = Math.floor(Math.random() * 5) + 1;
    
        axios.get(`http://cerpenmu.com/category/cerpen-${judul}/page/${page}`)
        .then((get) => {
          let $ = cheerio.load(get.data);
          let link = [];
          $('article.post').each(function (a, b) {
            link.push($(b).find('a').attr('href'));
          });

         
          let random = link[Math.floor(Math.random() * link.length)];
          if (!random) return reject("Tidak ada cerpen yang ditemukan!");

         
          axios.get(random).then((res) => {
            let $$ = cheerio.load(res.data);
            let hasil = {
              title: $$('#content > article > h1').text(),
              author: $$('#content > article')
                .text()
                .split('Cerpen Karangan: ')[1]
                ?.split('Kategori: ')[0]
                ?.trim(),
              kategori: $$('#content > article')
                .text()
                .split('Kategori: ')[1]
                ?.split('\n')[0]
                ?.trim(),
              lolos: $$('#content > article')
                .text()
                .split('Lolos moderasi pada: ')[1]
                ?.split('\n')[0]
                ?.trim(),
              cerita: $$('#content > article > p').text().trim(),
            };
            resolve(hasil);
          }).catch((err) => reject("Gagal memuat detail cerpen!"));
        })
        .catch((err) => reject("Gagal mengambil daftar cerpen!"));
    });
  }

 
  try {
    let cepren = await cerpen(q);
    let cepen = `*Judul:* ${cepren.title}\n*Author:* ${cepren.author}\n*Kategori:* ${cepren.kategori}\n*Lolos Moderasi:* ${cepren.lolos}\n\n*Cerita:*\n${cepren.cerita}`;
    await m.reply(cepen);
  } catch (err) {
    m.reply(`Error: ${err}`);
  }
};


handler.command = /^(cerpen|ceritapendek)$/i; 
module.exports = handler;
