let handler = (m) => m;

handler.before = async function (m, { hanz }) {
    let today = new Date();
    let todayString = `${today.getDate().toString().padStart(2, '0')},${(today.getMonth() + 1).toString().padStart(2, '0')}`; 
    for (let userId in global.db.data.users) {
        let user = global.db.data.users[userId];
        if (user.ultah && typeof user.ultah === "string") {
            let [day, month] = user.ultah.split(',').map(v => v.trim());
            if (`${day},${month}` === todayString) {
                if (user.ultahSent === todayString) {
                    continue;
                }
                await hanz.reply(userId, `🎉 Selamat ulang tahun! 🎉\n${user.name} Semoga panjang umur, sehat selalu, dan sukses dalam segala hal!\n\nDari kami: BOT dan tim Rangelofficial!`, null, {
                    mentions: [userId]
                });
                user.ultahSent = todayString;
            }
        }
    }
};

module.exports = handler;