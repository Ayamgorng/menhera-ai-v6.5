const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
const chalk = require('chalk')
const fs = require("fs")
const { color, bgcolor } = require('./color')
const gis = require("g-i-s")
const ytdl = require('ytdl-core');
const yts = require("yt-search");
const fetch = require("node-fetch");
const FormData = require("form-data");
const cookie = require("cookie");
const token = `e2dbd0c0-d21b-45d2-b60f-d49940f2d0e7`



async function mediafiredll(url) {
const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
const $ = cheerio.load(res.data);
const link = $('#downloadButton').attr('href');
const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','');
const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','');
let mime = '';
let rese = await axios.head(link)
mime = rese.headers['content-type']
return { name ,size ,date ,mime ,link };
  }

async function hentai() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 1153)
        axios.get('https://sfmcompile.club/page/'+page)
        .then((data) => {
            const $ = cheerio.load(data.data)
            const hasil = []
            $('#primary > div > div > ul > li > article').each(function (a, b) {
                hasil.push({
                    title: $(b).find('header > h2').text(),
                    link: $(b).find('header > h2 > a').attr('href'),
                    category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                    share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                    views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                    type: $(b).find('source').attr('type') || 'image/jpeg',
                    video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                    video_2: $(b).find('video > a').attr('href') || ''
                })
            })
            resolve(hasil)
        })
    })
}



async function instagram2(url) {
    let res = await axios("https://indown.io/")
    let _$ = cheerio.load(res.data)
    let referer = _$("input[name=referer]").val()
    let locale = _$("input[name=locale]").val()
    let _token = _$("input[name=_token]").val()
    let {
        data
    } = await axios.post("https://indown.io/download", new URLSearchParams({
        link: url,
        referer,
        locale,
        _token
    }), {
        headers: {
            cookie: res.headers["set-cookie"].join("; ")
        }
    })
    let $ = cheerio.load(data)
    let result = []
    let __$ = cheerio.load($("#result").html())
    __$("video").each(function() {
        let $$ = $(this)
        result.push({
            type: "video",
            thumbnail: $$.attr("poster"),
            url: $$.find("source").attr("src")
        })
    })
    __$("img").each(function() {
        let $$ = $(this)
        result.push({
            type: "image", 
            url: $$.attr("src")
        })
    })
   //console.log(`${__$}`)
    return result 
}




async function cekkuota() {
  return new Promise(async (resolve, reject) => {

    function bar(p) {
      let titik = "▒".repeat(10).split("");
      for (let i = 1; i <= p; i++) {
        if (i % 10 === 0) {
          titik[(i / 10) - 1] = "█";
        }
      }
      return "[ " + titik.join(" ") + " ]";
    }

    try {
      /*
      let getuser = await axios({
        headers: {
          "x-app-version": "8.11.0",
          "Authorization": `${query}`,
          "User-Agent": "okhttp/4.2.2"
        },
        method: "GET",
        url: "https://profile.api.axis.co.id/getuser"
      });

      let { msisdn } = JSON.parse(atob(getuser.data.data));
      console.log("*NOMOR: " + msisdn + "*\n");
*/
      let quota = await axios({
        headers: {
          "x-app-version": "8.11.0",
          "Authorization": `e2dbd0c0-d21b-45d2-b60f-d49940f2d0e7`,
          "User-Agent": "okhttp/4.2.2"
        },
        method: "GET",
        url: "https://quota.api.axis.co.id/quota"
      });

      let { result } = JSON.parse(atob(quota.data.data));
      let sisakuota = "";
      for (let kuota of result.detail) {
        let dateberlaku = new Date(kuota.benefitData.activeUntil);
        let bulan0 = dateberlaku.toLocaleDateString('id', { month: 'long' });
        let bulan = bulan0[0] + bulan0[1] + bulan0[2];
        sisakuota += "*" + kuota.name + "*\n" + bar(kuota.percentRemaining) + "\n" + kuota.remaining + "/" + kuota.total + " s.d " + dateberlaku.getDate() + " " + bulan + " " + dateberlaku.getFullYear() + " " + dateberlaku.getHours() + ":" + dateberlaku.getMinutes() + "\n\n";
      }
      resolve(sisakuota);
    } catch (error) {
      reject(error);
    }
  });
  }


async function tele (query) {
    return new Promise((resolve) => {
        axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const link = []
            $('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
                link.push($(b).attr('href'))
            })
            let rand = link[Math.floor(Math.random() * link.length)]
            axios.get(rand).then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                const url = []
                $$('#stickerPack > div > div.row > div > img').each(function(a, b) {
                    url.push($$(b).attr('src').split('&d=')[0])
                })
                resolve({
                    creator: 'Fajar Ihsana',
                    title: $$('#intro > div > div > h1').text(),
                    author: $$('#intro > div > div > h5 > a').text(),
                    author_link: $$('#intro > div > div > h5 > a').attr('href'),
                    sticker: url,
                })
            })
        })
    })
}



async function emoji (emoji)  {
    return new Promise((resolve, reject) => {
        axios.get(`https://emojipedia.org/search/?q=${encodeURIComponent(emoji)}`).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            resolve({
                creator: 'Fajar Ihsana',
                nama: $('body > div.container > div.content > article > h1').text(),
                result: {
                    apple: $('body').find('li:nth-child(1) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    google: $('body').find('li:nth-child(2) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    samsung: $('body').find('li:nth-child(3) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    microsoft: $('body').find('li:nth-child(4) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    whatsapp: $('body').find('li:nth-child(5) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    twitter: $('body').find('li:nth-child(6) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    facebook: $('body').find('li:nth-child(7) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    skype: $('body').find('li:nth-child(8) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    joypixels: $('body').find('li:nth-child(9) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    openemoji: $('body').find('li:nth-child(10) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    emojidex: $('body').find('li:nth-child(11) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    messenger: $('body').find('li:nth-child(12) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    lg: $('body').find('li:nth-child(13) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    htc: $('body').find('li:nth-child(14) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    mozilla: $('body').find('li:nth-child(15) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    softbank: $('body').find('li:nth-child(16) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    docomo: $('body').find('li:nth-child(17) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                },
            })
        })
    })
}
async function ttsAudio(text) {
  return new Promise((resolve, reject) => {
    try {
      const gtts = require('node-gtts');
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




                
            
                    
              



async function ephoto(url, texk) {
      let form = new FormData();
      let gT = await axios.get(url, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        },
      });
      let $ = cheerio.load(gT.data);
      let text = texk;
      let token = $('input[name=token]').val();
      let build_server = $('input[name=build_server]').val();
      let build_server_id = $('input[name=build_server_id]').val();
      form.append('text[]', text);
      form.append('token', token);
      form.append('build_server', build_server);
      form.append('build_server_id', build_server_id);
      let res = await axios({
        url: url,
        method: 'POST',
        data: form,
        headers: {
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
          cookie: gT.headers['set-cookie']?.join('; '),
          ...form.getHeaders(),
        },
      });
      let $$ = cheerio.load(res.data);
      let json = JSON.parse($$('input[name=form_value_input]').val());
      json['text[]'] = json.text;
      delete json.text;
      let { data } = await axios.post(
        'https://en.ephoto360.com/effect/create-image',
        new URLSearchParams(json),
        {
          headers: {
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            cookie: gT.headers['set-cookie'].join('; '),
          },
        }
      );
      return build_server + data.image;
    }

async function surah(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://litequran.net/${query}`)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const hasil = [];

                const surahName = $('body > main > article > h1').text();
                const bismillah = $('body > main > article > p').text();

                $('body > main > article > ol > li').each(function(a, b) {
                    const result = {
                        status: 200,
                        arab: $(b).find('> span.ayat').text(),
                        latin: $(b).find('> span.bacaan').text(),
                        translate: $(b).find('> span.arti').text()
                    };
                    hasil.push(result);
                });

                resolve({
                    surahName,
                    bismillah,
                    ayat: hasil
                });
            })
            .catch(reject);
    });
}

async function selectSurah(link){ 
    let { data }= await axios.get(link)
    const $ = cheerio.load(data)
    const Result = []
    const Isi = []
    var surah = $('body > main > article > h1').text()
    var bismillah = $('body > main > article > p').text()
    $('body > main > article > ol > li:nth-child(n)').each((i, e) => {
      const arabic = $(e).find('p.arabic').text()
      const baca = $(e).find('p.translate').text()
      const arti = $(e).find('p.meaning').text()
      Isi.push({
        arabic,
        baca,
        arti,
      });
    });
    Result.push({surah, bismillah}, Isi)
    return Result
	}
async function listsurah(){
  let { data }= await axios.get('https://litequran.net/')
  const $ = cheerio.load(data)
  const Result = []
  $('body > main > ol > li:nth-child(n)').each((i, e) => {
    const name_surah = $(e).find('a').text()
    const link = 'https://litequran.net/' + $(e).find('a').attr('href')
    Result.push({
      link,
      name_surah,
    });
  });
  return Result
}
async function getSurah(surahIndex) {
  const surahList = await listsurah();
  
  // Validasi jika nomor surah tidak sesuai
  if (surahIndex < 1 || surahIndex > surahList.length) {
    return "🚫 *Nomor surah tidak valid.* Silakan masukkan nomor surah yang sesuai.";
  }
  
  const selectedSurah = surahList[surahIndex - 1];
  const surahContent = await selectSurah(selectedSurah.link);

  // Header dan pembukaan
  let response = `🕌 *Surah ${surahContent[0].surah}*\n`;
  response += `📜 *Ayat yang penuh hikmah dan petunjuk bagi umat*:\n\n`;

  // Menambahkan ayat satu per satu
  surahContent[1].forEach((ayah, index) => {
    response += `*𖦹 Ayat ${index + 1}:*\n`;  // Menampilkan nomor ayat
    response += `🕋 ${ayah.arabic}\n`;  // Menampilkan teks Arab
    response += `📖 ${ayah.baca}\n`;    // Menampilkan transliterasi
    response += `📚 ${ayah.arti}\n\n`;  // Menampilkan terjemahan
  });

  // Menambahkan pesan penutup yang Islami
  response += `\n🤲 *Semoga kita selalu diberkahi oleh Allah dengan petunjuk dari ayat-ayat ini.*\n`;

  return response;
}

const tafsirsurah = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://tafsirq.com/topik/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = []
                $('body > div:nth-child(4) > div > div.col-md-6 > div ').each(function(a, b) {
                    result = {
                    status: 200,
                   // author: 'takim',
                    surah: $(b).find('> div.panel-heading.panel-choco > div > div > a').text(),
                    tafsir: $(b).find('> div.panel-body.excerpt').text().trim(),
                    type: $(b).find('> div.panel-heading.panel-choco > div > div > span').text(),
                    source: $(b).find('> div.panel-heading.panel-choco > div > div > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}


const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");
};

async function shortener(url) {
  return url;
}




async function mediafire (url) {
   const res = await axios.get(url) 
   const $ = cheerio.load(res.data)
   const link = $('a#downloadButton').attr('href')
   const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
   const seplit = link.split('/')
   const nama = seplit[5]
   mime = nama.split('.')
   mime = mime[1]
   return { nama, mime, size, link }
}

async function post(url, formdata = {}, cookies) {
  let encode = encodeURIComponent;
  let body = Object.keys(formdata)
    .map((key) => {
      let vals = formdata[key];
      let isArray = Array.isArray(vals);
      let keys = encode(key + (isArray ? "[]" : ""));
      if (!isArray) vals = [vals];
      let out = [];
      for (let valq of vals) out.push(keys + "=" + encode(valq));
      return out.join("&");
    })
    .join("&");
  return await fetch(`${url}?${body}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: cookies,
    },
  });
}

/**
 * TextPro Scraper
 * @function
 * @param {String} url - Your phootoxy url, example https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html.
 * @param {String[]} text - Text (required). example ["text", "text 2 if any"]
 */

async function textpro(url, text) {
  if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url))
    throw new Error("Url Salah!!");
  const geturl = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "GoogleBot",
    },
  });
  const caritoken = await geturl.text();
  let hasilcookie = geturl.headers
    .get("set-cookie")
    .split(",")
    .map((v) => cookie.parse(v))
    .reduce((a, c) => {
      return { ...a, ...c };
    }, {});
  hasilcookie = {
    __cfduid: hasilcookie.__cfduid,
    PHPSESSID: hasilcookie.PHPSESSID,
  };
  hasilcookie = Object.entries(hasilcookie)
    .map(([name, value]) => cookie.serialize(name, value))
    .join("; ");
  const $ = cheerio.load(caritoken);
  const token = $('input[name="token"]').attr("value");
  const form = new FormData();
  if (typeof text === "string") text = [text];
  for (let texts of text) form.append("text[]", texts);
  form.append("submit", "Go");
  form.append("token", token);
  form.append("build_server", "https://textpro.me");
  form.append("build_server_id", 1);
  const geturl2 = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: hasilcookie,
      ...form.getHeaders(),
    },
    body: form.getBuffer(),
  });
  const caritoken2 = await geturl2.text();
  const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(caritoken2);
  if (!token2) throw new Error("Token Tidak Ditemukan!!");
  const prosesimage = await post(
    "https://textpro.me/effect/create-image",
    JSON.parse(token2[1]),
    hasilcookie
  );
  const hasil = await prosesimage.json();
  return `https://textpro.me${hasil.fullsize_image}`;
}


//Pinterest
async function pinterest(query) {
	return new Promise((resolve, reject) => {
	  let err = { status: 404, message: "Terjadi kesalahan" }
	  gis({ searchTerm: query + ' site:id.pinterest.com', }, (er, res) => {
	   if (er) return err
	   let hasil = {
		  status: 200,
		  creator: '@takim._×',
		  result: []
	   }
	   res.forEach(x => hasil.result.push(x.url))
	   resolve(hasil)
	  })
	})
}


//KodePos
async function kodepos(kota) {
return new Promise(async (resolve, reject) => {
let postalcode = 'https://carikodepos.com/';
let url = postalcode+'?s='+kota;
await request.get({
headers: {
'Accept': 'application/json, text/javascript, */*;',
'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4209.3 Mobile Safari/537.36',
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
'Origin': postalcode,
'Referer': postalcode
},
url: url,
}, function(error, response, body) {
if (error) return reject(error);
let $ = cheerio.load(body);
var search = $('tr');
if (!search.length) return reject('No result could be found');
var results = [];
search.each(function(i) {
if (i != 0) {
var td = $(this).find('td');
var result = {};
td.each(function(i) {
var value = $(this).find('a').html();
var key = (i == 0) ? 'province' : (i == 1) ? 'city' : (i == 2) ? 'subdistrict' : (i == 3) ? 'urban' : 'postalcode';
result[key] = value;
})
results.push(result);
}
});
return resolve(results);
console.log(results)
});
});
};

// Fungsi untuk mencari wallpaper
async function wallpaper(title, page = '1') {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`)
            .then(({ data }) => {
                let $ = cheerio.load(data);
                let hasil = [];
                $('div.grid-item').each(function (a, b) {
                    hasil.push({
                        title: $(b).find('div.info > a > h3').text(),
                        type: $(b).find('div.info > a:nth-child(2)').text(),
                        source: 'https://www.besthdwallpaper.com/' + $(b).find('div > a:nth-child(3)').attr('href'),
                        image: [
                            $(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'),
                            $(b).find('picture > source:nth-child(1)').attr('srcset'),
                            $(b).find('picture > source:nth-child(2)').attr('srcset')
                        ]
                    });
                });
                resolve(hasil);
            })
            .catch(error => reject(error));
    });
}
async function igdl(url_media) {

    return new Promise(async (resolve,reject)=>{

        const BASE_URL = "https://instasupersave.com/"

        

        //New Session = Cookies

        try {

            const resp = await axios(BASE_URL);

            const cookie = resp.headers["set-cookie"]; // get cookie from request

            const session = cookie[0].split(";")[0].replace("XSRF-TOKEN=","").replace("%3D", "")

            

            //REQUEST CONFIG

            var config = {

                method: 'post',

                url: `${BASE_URL}api/convert`,

                headers: { 

                    'origin': 'https://instasupersave.com', 

                    'referer': 'https://instasupersave.com/pt/', 

                    'sec-fetch-dest': 'empty', 

                    'sec-fetch-mode': 'cors', 

                    'sec-fetch-site': 'same-origin', 

                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52', 

                    'x-xsrf-token': session, 

                    'Content-Type': 'application/json', 

                    'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`

                },

                data : {

                    url: url_media

                }

            };



            //REQUEST

            axios(config).then(function (response) {

                let ig = []

                if(Array.isArray(response.data)){

                    response.data.forEach(post => { ig.push(post.sd === undefined ? post.thumb : post.sd.url)})

                } else {

                    ig.push(response.data.url[0].url)    

                }

                

                resolve({

                    results_number : ig.length,

                    url_list: ig

                })

            })

            .catch(function (error) {

                reject(error.message)

            })

        } catch(e){

            reject(e.message)

        }

    })

}

module.exports = {
mediafiredll, 
cekkuota,
tele, 
instagram2, 
kodepos, 
pinterest,
wallpaper, 
ttsAudio,
igdl, 
textpro, 
mediafire,
surah,
listsurah,
getSurah,
tafsirsurah,
ephoto,
hentai,
emoji
}





let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
delete require.cache[file]
require(file)
})