const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');
const gtts = require('node-gtts');

let handler = async (m, { q, hanz, args, usedPrefix, command }) => {
  if (!q) return m.reply("Mau ngomong apa?");

  try {
    const needsGoogleSearch = shouldSearchGoogle(q);
    const apiUrl = `https://www.tanakadomp.biz.id/api/openai/open-ai?q=${encodeURIComponent(q)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    let aiMessage = data.status ? data.message : "Maaf, saya tidak bisa memberikan jawaban saat ini.";
    let googleMessage = "";

    // Hanya lakukan pencarian Google jika perlu
    if (needsGoogleSearch) {
      const searchResults = await googleSearch(q);
      if (Array.isArray(searchResults)) {
        googleMessage = searchResults
          .map((result, index) => 
            `*${index + 1}.* [${result.title}](${result.link})\n_${result.snippet}_\n`
          )
          .join("\n");
      } else {
        googleMessage = searchResults;
      }
    }

    const resultMessage = needsGoogleSearch
      ? `*Jawaban AI:*\n${aiMessage}\n\n*Hasil Pencarian Google:*\n${googleMessage}`
      : `*Jawaban AI:*\n${aiMessage}`;

   
    const wantsAudio = q.toLowerCase().includes("jawab dengan suara");
    let audioBuffer;

   
    if (wantsAudio) {
      try {
        audioBuffer = await ttsAudio(aiMessage);
        hanz.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
        return; 
      } catch (e) {
        console.error(e);
        return m.reply('Terjadi kesalahan saat memproses teks ke suara.');
      }
    }

    
    await m.reply(resultMessage);

  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    m.reply("Maaf, terjadi kesalahan saat memproses permintaan.");
  }
};

handler.help = ["chatgpt"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = ["ai"];

module.exports = handler;

const ttsAudio = async (text) => {
  return new Promise((resolve, reject) => {
    try {
      const lang = 'id';
      const ttsInstance = gtts(lang);
      const filePath = `${1 * new Date()}.mp3`; 
      ttsInstance.save(filePath, text, () => {
        const audioBuffer = fs.readFileSync(filePath);
        fs.unlinkSync(filePath); 
        resolve(audioBuffer);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const shouldSearchGoogle = (query) => {
  const keywords = ["siapa", "kapan", "dimana", "kenapa","sejarah", "asal usul"];
  return keywords.some((keyword) => query.toLowerCase().includes(keyword));
};

const googleSearch = async (query) => {
  const searchQuery = encodeURIComponent(query);
  const url = `https://www.google.com/search?q=${searchQuery}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);
    const results = [];
    $(".tF2Cxc").each((i, el) => {
      const title = $(el).find(".DKV0Md").text();
      const snippet = $(el).find(".VwiC3b").text();
      const link = $(el).find(".yuRUbf a").attr("href");
      results.push({ title, snippet, link });
    });

    return results.length > 0
      ? results.map((result) => ({
          title: result.title,
          snippet: result.snippet,
          link: result.link,
        }))
      : "Tidak ada hasil yang ditemukan.";
  } catch (error) {
    console.error("Error while scraping Google:", error);
    return "Maaf, terjadi kesalahan saat melakukan pencarian Google.";
  }
};