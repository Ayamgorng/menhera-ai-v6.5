let handler = async (m, { reply }) => {

let kartIntro = `${gris1}INTRO MEMBARU
-----------------
Nama     : 
Umur     : 
Kelas    : 
Co/Ce    : 
Askot    : 
Hobi     : 
Status   : 
Agama    : 
-----------------
NOTE:
● Status: Jomblo/Pacaran
● Askot: Asal Kota
● Agama: Boleh Di Privat
● Jangan Lupa Baca Deskripsi Grup

SALKEN ALL${gris1}`
reply(kartIntro)

};
handler.help = ["intro"];
handler.tags = ["group"];
handler.command = ["intro","kartuintro"];
handler.onlyGroup = true;
module.exports =  handler;