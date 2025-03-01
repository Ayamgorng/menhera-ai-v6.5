const fetch = require("node-fetch");

let handler = async (m, { hanz, q, setReply }) => {
  try {
    // Pesan pengantar jika input tidak diberikan
  
var teks = Ehztext(`📖 *Silakan masukkan nama dan nomor hadits yang ingin dicari*:
    
    Contoh: *hadist muslim 1*
    
    Berikut daftar kitab hadits yang tersedia:
    
    1. Abu-Daud (1 - 4419)
    2. Ahmad (1 - 4305)
    3. Bukhari (1 - 6638)
    4. Darimi (1 - 2949)
    5. Ibnu-Majah (1 - 4285)
    6. Malik (1 - 1587)
    7. Muslim (1 - 4930)
    8. Nasai (1 - 5364)
    9. Tirmidzi (1 - 3625)
    `);

  
    if (!q) throw teks;

 
    let hadist = q.split(' ')[0].toLowerCase(); 
    let nomer = q.split(' ')[1];  
    if (!nomer) {
      return setReply("🚫 *Mohon masukkan nomor hadits setelah nama kitab.*\n\nContoh: *hadist muslim 1*");
    }

    // Fetch hadits dari API
    let response = await fetch(`https://api.hadith.gading.dev/books/${hadist}/${nomer}`);
    
  
    if (!response.ok) {
      throw new Error('API tidak dapat diakses, coba lagi nanti.');
    }

    let result = await response.json();

 
    if (result.error || !result.data) {
      return setReply(`🚫 *Maaf, hadits tidak ditemukan.* Pastikan nama kitab dan nomor hadits benar.\nContoh: *hadist muslim 1*`);
    }

   
    let mess = `
*📜 Hadits dari Kitab ${hadist.charAt(0).toUpperCase() + hadist.slice(1)}*

📌 *Nomor Hadits*: ${result.data.contents.number}
  
🕌 *Teks Arab*: 
${result.data.contents.arab}

📖 *Terjemahan*: 
${result.data.contents.id}

🤲 *Semoga kita senantiasa diberkahi oleh Allah melalui ilmu dari hadits ini.*`;

    m.reply(mess);
    
  } catch (e) {
   
    console.error(e);
    setReply(teks);
  }
};

handler.help = ["hadist"];
handler.tags = ["quotes"];
handler.command = ["hadist"];
handler.noCmdStore = true  
handler.onlyGroup = true
module.exports = handler;

