const Jimp = require("jimp");
const axios = require("axios");

const rollDice = (num = 1) => Math.floor(Math.random() * 6) + 1;

const fetchImage = async (url) => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return await Jimp.read(Buffer.from(response.data, "binary"));
  } catch (error) {
    console.error(`Error fetching image from ${url}:`, error);
    throw error;
  }
};

const calculatePlayerPosition = (playerPosition, cellWidth, cellHeight) => {
  const row = 9 - Math.floor((playerPosition - 1) / 10);
  const col = (playerPosition - 1) % 10;
  const x = col * cellWidth + 10;
  const y = row * cellHeight + 10;
  return { x, y };
};

const createBoardBuffer = async (bgImage, players, currentPositions, playerImages, cellWidth, cellHeight) => {
  const board = new Jimp(420, 420);
  bgImage.resize(420, 420);
  board.composite(bgImage, 0, 0);

  for (const player of players) {
    const { x, y } = calculatePlayerPosition(currentPositions[player], cellWidth, cellHeight);
    const playerImage = playerImages[player.color];
    board.composite(playerImage, x, y);
  }

  return board.getBufferAsync(Jimp.MIME_PNG);
};

module.exports = {
  rollDice,
  fetchImage,
  calculatePlayerPosition,
  createBoardBuffer,
};