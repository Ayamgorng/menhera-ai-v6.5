const pickRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)];
};

const handler = async (m, { hanz,command, text }) => {
    if (!text) return hanz.reply(m.chat, 'Hei, isi namamu dulu dong biar aku bisa cek khodammu!', m);

    let khodams = [
        { name: "Harimau Cinta", meaning: "Kamu buas... dalam urusan cinta. Siap menerkam siapa saja yang berani mendekati gebetanmu!" },
        { name: "Monyet Gabut", meaning: "Kamu lincah dan pintar... menghindari pekerjaan. Sering ketangkap lagi bengong, ya?" },
        { name: "Naga Tiduran", meaning: "Kamu perkasa... tapi suka rebahan. Kalau ada yang minta tolong, jawabnya 'nanti aja'." },
        { name: "Burung Gagal Terbang", meaning: "Kamu punya mimpi besar... tapi sering nyangkut di pohon. Jangan lupa belajar dari kegagalan, ya!" },
        { name: "Serigala Jomblo", meaning: "Kamu setia... pada kesendirian. Udah lama nggak dapet chat, ya?" },
        { name: "Macan Ngopi", meaning: "Kamu kuat... tapi cuma kalau udah ngopi dulu. Tanpa kopi, kamu kayak macan yang ngantuk." },
        { name: "Kuda Malas", meaning: "Kamu cepat... nyari alasan buat nggak kerja. Ayo dong, semangat dikit!" },
        { name: "Elang Galau", meaning: "Kamu bisa terbang tinggi... kecuali pas mikirin mantan. Jangan kebanyakan melamun, ya!" },
        { name: "Harimau Laper", meaning: "Kamu galak... tapi cuma kalau lagi laper. Kalau udah makan, jadi kalem deh." },
        { name: "Gajah Sok Tahu", meaning: "Kamu bijaksana... kecuali pas lagi debat. Semua orang salah, cuma kamu yang benar (katanya)!" },
        { name: "Banteng Salah Parkir", meaning: "Kamu kuat dan penuh tenaga... tapi sering nggak tepat sasaran. Parkir aja masih meleset, gimana soal asmara?" },
        { name: "Ular Lupa Jalan", meaning: "Kamu penuh strategi... tapi sering bingung sendiri. Jalannya belok-belok terus, mau kemana sebenernya?" },
        { name: "Ikan Tidur Siang", meaning: "Kamu tenang... ya tenang banget, sampai-sampai orang nggak sadar kalau kamu ada." },
        { name: "Kucing Gagal Lompat", meaning: "Kamu misterius... dan suka nekat, tapi sering gagal. Jangan sedih, nanti bisa lompat lebih tinggi!" },
        { name: "Rusa Tersesat", meaning: "Kamu anggun... tapi suka bingung sendiri, udah muter-muter tapi nggak sampai-sampai!" },
        { name: "Singa Curhat", meaning: "Kamu lahir sebagai pemimpin... tapi kok sering curhat sih? Pemimpin juga butuh didengar, ya!" },
        { name: "Kijang Lupa Gas", meaning: "Kamu cepat... atau ya harusnya cepat, cuma sering lupa kalau punya gas. Gas terus, jangan lupa!" },
        { name: "Kura-kura Ngaret", meaning: "Kamu sabar... terlalu sabar sampai kadang datang telat ke mana-mana. Ayo dong, jangan ngaret mulu!" },
        { name: "Burung Hantu Pelupa", meaning: "Kamu bijaksana... tapi sering lupa. Malam ini mikir dalam-dalam, besok lupa semua." },
        { name: "Kuda Laut Ngambek", meaning: "Kamu unik... tapi suka ngambek kalau nggak diturutin. Santai aja, hidup nggak selalu sesuai harapan!" },
        { name: "Kuda Hitam Gebetan Orang", meaning: "Kamu penuh semangat... tapi sayangnya semangat buat ngejar gebetan orang lain. Hati-hati ya!" },
        { name: "Harimau Pelupa", meaning: "Kamu kuat... tapi suka lupa bawa dompet pas ditraktir. Ingat ya, kekuatanmu tidak berlaku di semua tempat." }
    ];

    let khodam = pickRandom(khodams);

    hanz.reply(m.chat, `
  「 *CEK KHODAM ${text}* 」

• Nama : ${text}
• Khodam : ${khodam.name}
• Arti : ${khodam.meaning}

`.trim(), m, m.mentionedJid ? {
        mentions: m.mentionedJid
    } : {});
};

// Ekspor handler sebagai module

handler.help = ['cekkhodam <nama>'];
handler.tags = ['fun'];
handler.command = /^cekkhodam/i;
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["cek khodam seseorang"]
module.exports = handler;
