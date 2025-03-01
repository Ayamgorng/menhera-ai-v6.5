let handler = async (m, { hanz,setReply }) => {
  try {
    // Pesan cara mendapatkan limit
    let pesan = Ehztext(`${gris}CARA MUDAH DAPAT LIMIT!${gris} 
📌 *Halo, ${m.pushname}!*

>💡 *Butuh limit? Jangan bingung!*
Berikut cara mudah untuk mendapatkannya:
  
1. ${gris}🎮 Bermain Game${gris} 
   - Raih kemenangan dalam game seru dan dapatkan saldo sebagai hadiah!
   
2. ${gris}🎁 Klaim Harian${gris} 
   - Jangan lewatkan klaim saldo harianmu! Ketik *.claimgame* setiap hari.

3. ${gris}💰 Tukarkan Saldo${gris}
   - Gunakan saldo yang telah kamu kumpulkan untuk membeli limit. Cukup ketik *.buylimit*.

4. ${gris}🛒 Kunjungi Toko${gris}
   - Cari lebih banyak penawaran menarik di toko kami! Ketik *.shopc* untuk menjelajahi produk.

✨ *Tips*: Semakin sering bermain, semakin banyak saldo yang bisa kamu kumpulkan. Jangan sampai ketinggalan!

`);

    // Kirim pesan ke pengguna
    setReply(pesan);
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, `Terjadi kesalahan saat mengirim informasi.`, m);
  }
};

handler.help = ['caradapetlimit'];
handler.tags = ['info'];
handler.command = /^(caradapetlimit)$/i;
handler.noCmdStore = true
module.exports = handler;
