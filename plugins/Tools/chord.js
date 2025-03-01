const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { text }) => {
	if (!text) throw 'Mana judul lagunya?';
	let chordSearch = await chord(text);
	m.reply(`*Song :* ${chordSearch.title}\n*Author :* ${chordSearch.author}\n*Image :* ${chordSearch.image}\n*Chord :*\n\n${chordSearch.chord}`);
};

handler.help = ['chord'];
handler.tags = ['tools'];
handler.command = /^(chord|kuncigitar)$/i;
handler.limit = true;

module.exports = handler;

async function chord(query) {
  return new Promise(async (resolve, reject) => {
    const head = {
      "User-Agent": "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
      "Cookie": "__gads=ID=4513c7600f23e1b2-22b06ccbebcc00d1:T=1635371139:RT=1635371139:S=ALNI_MYShBeii6AFkeysWDKiD3RyJ1106Q; _ga=GA1.2.409783375.1635371138; _gid=GA1.2.1157186793.1635371140; _fbp=fb.1.1635371147163.1785445876"
    };

    try {
     
      let { data } = await axios.get("http://app.chordindonesia.com/?json=get_search_results&exclude=date,modified,attachments,comment_count,comment_status,thumbnail,thumbnail_images,author,excerpt,content,categories,tags,comments,custom_fields&search=" + query, { headers: head });

    
      let response = await axios.get("http://app.chordindonesia.com/?json=get_post&id=" + data.posts[0].id, { headers: head });
      let $ = cheerio.load(response.data.post.content);

     
      let title = data.posts[0].title_plain;
      let author = data.posts[0].author_name || "Unknown";
      let image = data.posts[0].thumbnail || "No image available"; 
      let chord = $("pre").text().trim();

      resolve({
        title: title,
        author: author,
        image: image,
        chord: chord
      });
    } catch (error) {
      reject(error);
    }
  });
}
