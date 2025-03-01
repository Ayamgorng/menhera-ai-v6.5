const fetch = require('node-fetch');

let handler = async (m, { command, hanz, sendButImg}) => {
    let heyy; // Variable to hold the fetched data

    // Define the mapping of commands to URLs
    const commandMap = {
        kartun: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/kartun.json',
        katakata: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/katakata.json',
        kpop: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/kpop.json',
        kucing: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/kucing.json',
        lisa: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/lisa.json',
        megumin: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/megumin.json',
        mikey: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/mikey.json',
        mobil: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/mobil.json',
        motor: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/motor.json',
        gifs: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/gifs.json',
        hekel: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/hekel.json',
        hijaber: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/hijaber.json',
        islamic: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/islamic.json',
        cyber: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/cyber.json',
        darkjokes: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/darkjokes.json',
        doraemon: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/doraemon.json',
        eba: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/eba.json',
        exo: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/exo.json',
        freefire: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/freefire.json',
        gamewallpaper: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/gamewallpaper.json',
        mountain: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/mountain.json',
        neko: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/neko.json',
        neko2: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/neko2.json',
        nekonime: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/nekonime.json',
        panties: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/panties.json',
        pentol: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/pentol.json',
        pokemon: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/pokemon.json',
        programming: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/programming.json',
        pubg: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/pubg.json',
        randblackpink: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/randblackpink.json',
        randomnime: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/randomnime.json',
        randomnime2: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/randomnime2.json',
        rose: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/rose.json',
        ryujin: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/ryujin.json',
        satanic: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/satanic.json',
        shinomiya: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/shinomiya.json',
        tatasurya: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/tatasurya.json',
        technology: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/technology.json',
        tejina: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/tejina.json',
        waifu: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/waifu.json',
        wallhp: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/wallhp.json',
        wallnime: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/wallnime.json',
        yotsuba: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/yotsuba.json',
        yulibocil: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/yulibocil.json',
        yumeko: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/yumeko.json',
        cosplayloli: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/cosplayloli.json',
        cosplaysagiri: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/cosplaysagiri.json',
        cogan: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/cogan.json',
        chiho: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/chiho.json',
        cecan: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/cecan.json',
        bts: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/bts.json',
        boneka: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/boneka.json',
        art: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/art.json',
        anjing: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/anjing.json',
        ana: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/ana.json',
        jeni: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/jeni.json',
        jiso: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/jiso.json',
        justina: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/justina.json',
        kagura: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/kagura.json',
        aesthetic: 'https://raw.githubusercontent.com/KirBotz/nyenyee/master/aesthetic.json',
    };

    for (const [keyword, url] of Object.entries(commandMap)) {
        if (new RegExp(keyword).test(command)) {
            heyy = await fetch(url).then(res => res.json());
            const yeha = heyy[Math.floor(Math.random() * heyy.length)];
 
          hanz.sendMessage(m.from, { caption: '*SUCCESS*', image: { url: yeha } }, { quoted: m });
            return; 
        }
    }

    hanz.sendMessage(m.from, { text: 'Command not found!' }, { quoted: m });
};

handler.command = [
    'kartun', 'katakata', 'kpop', 'kucing', 'lisa', 'megumin', 'mikey', 'mobil', 
    'motor', 'gifs', 'hekel', 'hijaber', 'islamic', 'cyber', 'darkjokes', 'doraemon',
    'eba', 'exo', 'freefire', 'gamewallpaper', 'mountain', 'neko', 'neko2', 'nekonime',
    'panties', 'pentol', 'pokemon', 'programming', 'pubg', 'randblackpink', 'randomnime',
    'randomnime2', 'rose', 'ryujin', 'satanic', 'shinomiya', 'tatasurya', 'technology',
    'tejina', 'waifu', 'wallhp', 'wallnime', 'yotsuba', 'yulibocil', 'yumeko', 
    'cosplayloli', 'cosplaysagiri', 'cogan', 'chiho', 'cecan', 'bts', 'boneka', 'art',
    'anjing', 'ana', 'jeni', 'jiso', 'justina', 'kagura', 'aesthetic'
];

handler.tags = ['anime', 'manga', 'fun']; 
handler.help = ['kartun', 'katakata', 'kpop', 'kucing']; 
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["kumpulan iamge"]
module.exports = handler;
