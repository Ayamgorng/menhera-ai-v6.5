const {
  rollDice,
  fetchImage,
  createBoardBuffer,
} = require("../../lib/_ulartangga");

const SnakeAndLadderGame = async (m, { args, usedPrefix, command, hanz }) => {
  hanz.ulartangga = hanz.ulartangga || {};
  const sessions = hanz.ulartangga;
  const sessionId = m.chat;

  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      players: [],
      currentPositions: {},
      currentPlayerIndex: 0,
      started: false,
      boardSize: 100,
      snakesAndLadders: [
        { start: 29, end: 7 },
        { start: 24, end: 12 },
        { start: 15, end: 37 },
        { start: 23, end: 41 },
        { start: 72, end: 36 },
        { start: 49, end: 86 },
        { start: 90, end: 56 },
        { start: 75, end: 64 },
        { start: 74, end: 95 },
        { start: 91, end: 72 },
        { start: 97, end: 78 },
      ],
      bgImageUrl:
        "https://i.pinimg.com/originals/2f/68/a7/2f68a7e1eee18556b055418f7305b3c0.jpg",
      playerImageUrls: {
        red: "https://telegra.ph/file/86fd8ea9311e2bc99ae63.jpg",
        green: "https://dkonten.com/studio/wp-content/uploads/sites/19/2023/05/search-1.png",
      },
      bgImage: null,
      playerImages: {},
      cellWidth: 40,
      cellHeight: 40,
    };
  }

  const session = sessions[sessionId];

  switch (args[0]) {
    case "join":
      if (session.started) return m.reply("🛑 Permainan sudah dimulai.");
      const playerName = m.sender;
      if (session.players.includes(playerName)) {
        return m.reply("⚠️ Anda sudah bergabung dalam permainan.");
      }
      if (session.players.length >= 2) {
        return m.reply("⚠️ Maksimal 2 pemain saja.");
      }

      const color = session.players.length === 0 ? "red" : "green";
      session.players.push({ name: playerName, color });
      session.currentPositions[playerName] = 1;

      m.reply(`👋 ${color.toUpperCase()} bergabung sebagai ${playerName}`, null, {
        mentions: [playerName],
      });
      break;

    case "start":
      if (session.started) return m.reply("🛑 Permainan sudah dimulai.");
      if (session.players.length < 2) return m.reply("⚠️ Dibutuhkan 2 pemain untuk memulai.");

      session.started = true;
      session.bgImage = await fetchImage(session.bgImageUrl);
      for (const player of session.players) {
        session.playerImages[player.color] = await fetchImage(session.playerImageUrls[player.color]);
        session.playerImages[player.color].resize(session.cellWidth, session.cellHeight);
      }

      const boardBuffer = await createBoardBuffer(
        session.bgImage,
        session.players,
        session.currentPositions,
        session.playerImages,
        session.cellWidth,
        session.cellHeight
      );

      await hanz.sendMessage(m.chat, { image: boardBuffer, caption: "🐍🎲 Permainan Dimulai!" });
      break;

    case "roll":
      if (!session.started) return m.reply("⚠️ Permainan belum dimulai.");
      const currentPlayer = session.players[session.currentPlayerIndex];
      const diceResult = rollDice();

      m.reply(`🎲 ${currentPlayer.name} melempar dadu dan mendapatkan angka ${diceResult}`);

      session.currentPositions[currentPlayer.name] += diceResult;

      // Pindah ke kotak berikutnya (ladders/snakes)
      const position = session.currentPositions[currentPlayer.name];
      for (const sl of session.snakesAndLadders) {
        if (sl.start === position) {
          session.currentPositions[currentPlayer.name] = sl.end;
          m.reply(
            `🌀 ${currentPlayer.name} terkena ${
              sl.start > sl.end ? "ular 🐍" : "tangga 🪜"
            } ke kotak ${sl.end}`
          );
          break;
        }
      }

      // Menang
      if (session.currentPositions[currentPlayer.name] >= session.boardSize) {
        m.reply(`🎉 ${currentPlayer.name} menang! Permainan berakhir.`);
        delete sessions[sessionId];
        return;
      }

      session.currentPlayerIndex = (session.currentPlayerIndex + 1) % session.players.length;

      // Update board
      const updatedBoard = await createBoardBuffer(
        session.bgImage,
        session.players,
        session.currentPositions,
        session.playerImages,
        session.cellWidth,
        session.cellHeight
      );
      await hanz.sendMessage(m.chat, { image: updatedBoard });
      break;

    case "reset":
      delete sessions[sessionId];
      m.reply("🔄 Permainan direset.");
      break;

    default:
      m.reply(
        `🎲🐍 *Permainan Ular Tangga* 🐍🎲\n\n*Commands:*\n- *${usedPrefix + command} join* : Bergabung.\n- *${usedPrefix + command} start* : Mulai permainan.\n- *${usedPrefix + command} roll* : Lempar dadu.\n- *${usedPrefix + command} reset* : Reset permainan.`
      );
  }
};

SnakeAndLadderGame.command = /^(ulartangga|snakeladders|ular)$/i;
SnakeAndLadderGame.help = ["ulartangga"];
SnakeAndLadderGame.tags = ["game"];

module.exports = SnakeAndLadderGame;