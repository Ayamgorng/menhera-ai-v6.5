async function handler(m, { hanz, usedPrefix, command, text,args,reply }) {
let {
    emoji_role,
    sesi,
    playerOnGame,
    playerOnRoom,
    playerExit,
    dataPlayer,
    dataPlayerById,
    getPlayerById,
    getPlayerById2,
    killWerewolf,
    killww,
    dreamySeer,
    sorcerer,
    protectGuardian,
    roleShuffle,
    roleChanger,
    roleAmount,
    roleGenerator,
    addTimer,
    startGame,
    playerHidup,
    playerMati,
    vote,
    voteResult,
    clearAllVote,
    getWinner,
    win,
    pagi,
    malam,
    skill,
    voteStart,
    voteDone,
    voting,
    run,
    run_vote,
    run_malam,
    run_pagi
} = require('../../lib/warewolf')

    const {
        sender,
        chat
    } = m;
    hanz.werewolf = hanz.werewolf ? hanz.werewolf : {};
    const ww = hanz.werewolf ? hanz.werewolf : {};
    const value = args[0];
    const target = args[1];

    if (playerOnGame(sender, ww) === false)
        return reply("Kamu tidak dalam sesi game");
    if (dataPlayer(sender, ww).status === true)
        return reply(
            "Skill telah digunakan, skill hanya bisa digunakan sekali setiap malam"
        );
    if (dataPlayer(sender, ww).isdead === true)
        return reply("Kamu sudah mati");
    if (!target || target.length < 1) return reply("Masukan nomor player");
    if (isNaN(target)) return reply("Gunakan hanya nomor");
    let byId = getPlayerById2(sender, parseInt(target), ww);
    if (byId.db.isdead === true) return reply("Player sudah mati");
    if (byId.db.id === sender)
        return reply("Tidak bisa menggunakan skill untuk diri sendiri");
    if (byId === false) return reply("Player tidak terdaftar");
    if (value === "kill") {
        if (dataPlayer(sender, ww).role !== "werewolf")
            return reply("Peran ini bukan untuk kamu");
        if (byId.db.role === "sorcerer")
            return reply("Tidak bisa menggunakan skill untuk teman");
        return m
            .reply("Berhasil membunuh player " + parseInt(target))
            .then(() => {
                dataPlayer(sender, ww).status = true;
                killWerewolf(sender, parseInt(target), ww);
            });
    } else if (value === "dreamy") {
        if (dataPlayer(sender, ww).role !== "seer")
            return reply("Peran ini bukan untuk kamu");
        let dreamy = dreamySeer(m.sender, parseInt(target), ww);
        return m
            .reply(`Berhasil membuka identitas player ${target} adalah ${dreamy}`)
            .then(() => {
                dataPlayer(sender, ww).status = true;
            });
    } else if (value === "deff") {
        if (dataPlayer(sender, ww).role !== "guardian")
            return reply("Peran ini bukan untuk kamu");
        return reply(`Berhasil melindungi player ${target}`)
        .then(() => {
            protectGuardian(m.sender, parseInt(target), ww);
            dataPlayer(sender, ww).status = true;
        });
    } else if (value === "sorcerer") {
        if (dataPlayer(sender, ww).role !== "sorcerer")
            return reply("Peran ini bukan untuk kamu");
        let sorker = sorcerer(sesi(m.sender), target);
        return m
            .reply(`Berhasil membuka identitas player ${player} adalah ${sorker}`)
            .then(() => {
                dataPlayer(sender, ww).status = true;
            });
    }
}
handler.command = handler.help = ["werewolfpc", "wwpc"];
handler.tags = ["game"];
handler.noCmdStroe = true
handler.register = true;
handler.onlyGroup = true;

module.exports = handler;