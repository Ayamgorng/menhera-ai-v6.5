/* 
  ────────「 *RANGELOFFICIAL* 」──────── 
  Powered by *EhanzDhoanx* × *MENHERA MD* 
  Copyright © Raihan Fadillah 
  Instagram: @ehanzdhonax 

  ⚠️ *Jangan hapus watermark ini!* 
  Dukunganmu sangat berarti untuk kami! 
  ──────────────────────────────── 
*/

const axios = require('axios');


let handler = async (m, { q, hanz, args, usedPrefix, command }) => {
  if (!q) return m.reply("Mau cari apa di Google?");

  try {
    
    const searchResults = await googleSearch(q);

    if (typeof searchResults === 'string') {
      m.reply(searchResults);
      return;
    }

  
    let replyMessage = '🎉 *Hasil Pencarian Kamu Telah Tiba!* 🎉\n\n🔍 *Berikut adalah hasil yang saya temukan berdasarkan pencarianmu:*\n\n';

    searchResults.forEach((result, index) => {
      replyMessage += `\n${index + 1}. *${result.title}*\n${result.snippet}\n[Link: ${result.link}]`;
    });
 m.reply(replyMessage);

  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    m.reply("Terjadi kesalahan saat mengambil data.");
  }
};

handler.help = ["google"];
handler.tags = ["internet", "search"];
handler.command = ["searchgoogle","goggle"];
handler.noCmdStroe = true
handler.onlyGroup = true;
module.exports = handler;

const googleSearch = async (query) => {
  const searchQuery = encodeURIComponent(query);
  const url = `https://www.google.com/search?q=${searchQuery}`;

  try {
    // Request ke Google
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

   
    const $ = require('cheerio').load(response.data);
    const results = [];
    $('.tF2Cxc').each((i, el) => {
      const title = $(el).find('.DKV0Md').text();
      const snippet = $(el).find('.VwiC3b').text();
      const link = $(el).find('.yuRUbf a').attr('href');
      results.push({ title, snippet, link });
    });

    if (results.length > 0) {
      return results.map((result, index) => ({
        title: result.title,
        snippet: result.snippet,
        link: result.link,
      }));
    } else {
      return 'No results found for your query.';
    }
  } catch (error) {
    console.error('Error while scraping Google:', error);
    return 'Sorry, an error occurred while performing the search.';
  }
};