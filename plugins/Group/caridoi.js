// cariteman.js

let handler = async (m, { hanz, setReply}) => {
    let userny = Object.values(db.data.users);
    let teman = userny[Math.floor(Math.random() * userny.length)];
    let namTemen = teman.name;
    let nomerTemen = teman.id;
    
    setTimeout(() => {
        setReply('Sedang mencari....');
    }, 1000);

    setTimeout(() => {
        setReply('Berhasil mendapatkan satu orang');
    }, 5000);

    setTimeout(() => {
        hanz.sendContact(m.chat, nomerTemen, namTemen, m);
    }, 9000);
};

handler.help = ["caridoi", "cariteman"];
handler.tags = ["search"];
handler.command = ["caridoi", "cariteman"];

module.exports = handler;
