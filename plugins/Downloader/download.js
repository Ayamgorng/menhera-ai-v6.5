const axios = require('axios');
const cheerio = require('cheerio');

const retatube = {
  getPrefix: async () => {
    try {
      const { data } = await axios.get('https://retatube.com/api/v1/aio/index?s=retatube.com', {
        headers: { 'User-Agent': 'Postify/1.0.0' }
      });
      const prefix = cheerio.load(data)('input[name="prefix"]').val();
      if (!prefix) throw new Error('Waduh, prefix nya kagak ada nih bree.. Input manual aja yak Prefix nya');
      return prefix;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
 
  request: async (prefix, vidLink) => {
    try {
      const p = new URLSearchParams({ prefix, vid: vidLink }).toString();
      const { data } = await axios.post('https://retatube.com/api/v1/aio/search', p, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Postify/1.0.0',
        }
      });
      
      const ext = (regex) => (data.match(regex) || [])[1] || '';
      const fans = ext(/<p><strong>Fans：<\/strong>(\d+)/);
      const views = ext(/<p><strong>Views:：<\/strong>(\d+)/);
      const shares = ext(/<p><strong>Shares：<\/strong>(\d+)/);
 
      const $ = cheerio.load(data);
      const ex = $('div.icon-box').map((_, element) => {
        const title = $(element).find('strong:contains("Title")').text().replace('Title：', '').trim();
        const owner = $(element).find('strong:contains("Owner")').parent().text().replace('Owner：', '').trim();
        const image = $(element).find('img').attr('src');
 
        const dlink = $('a.button.primary.expand')
          .map((_, el) => {
            const link = $(el).attr('href');
            if (link === 'javascript:void(0);') return null;
            const teks = $(el).find('span').text().replace('Download', '').trim().toLowerCase()
              .replace(/[]/g, '').replace(/\s+/g, '_')
              .split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return { title: teks, link };
          })
          .get()
          .filter(Boolean);
 
        return { title, owner, fans, views, shares, image, dlink };
      }).get();
 
      return ex;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
 
  scrape: async (vidLink) => {
    try {
      const prefix = await retatube.getPrefix();
      return await retatube.request(prefix, vidLink);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};

let handler = async (m, { hanz, setReply, text }) => {
  if (!text) return setReply('⚠️ Masukkan URL video yang valid!');

  try {
    let videoData = await retatube.scrape(text);
    
    if (videoData.length === 0) {
      return setReply('⚠️ Tidak ada link unduhan yang ditemukan!');
    }

 
    let replyText = '🎥 *Link Unduhan Tersedia:*\n';
    videoData.forEach((video, index) => {
      replyText += `\n${index + 1}. *${video.title}*\n`;
      video.dlink.forEach(dl => {
        replyText += `- [${dl.title}](${dl.link})\n`;
      });
    });

    hanz.sendMessage(m.chat, { text: replyText });
  } catch (error) {
    console.error(error.message);
    hanz.sendMessage(m.chat, { text: '⚠️ Gagal mendapatkan data video atau link unduhan!' });
  }
};

handler.command = ['retatube', 'retadown','download'];
handler.tags = ['downloader'];
handler.description = ['Unduhan video menggunakan Retatube'];
handler.noCmdStore = true;
handler.onlyGroup = false;

module.exports = handler;