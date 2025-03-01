let handler = async (m, { hanz,reply }) => {
    // Daftar pertanyaan untuk truth
    const dare = ['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bilang can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you', 'prank chat mantan dan bilang " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
	

    // Memilih pertanyaan secara acak
    const Daree = dare[Math.floor(Math.random() * dare.length)];
 let DARE = Ehztext(Daree)
   let DAREEE = `┌  ––––––『 *DARE* 』––––––\n\nHai ${m.pushname}\n${DARE}\n\n└ –––––– `

 reply(DAREEE)
};

handler.command = ['dare']; // Ganti sesuai dengan perintah yang diinginkan
handler.tags = ['fun'];
handler.help = ['dare'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["tantangan menarik"]
module.exports = handler;
