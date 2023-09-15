const POSIBLE_WINS_SHEET = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function getWinner(gameState, currentPlayer: "x" | "o") {
  const currentPlays = Object.entries(gameState)
    .filter(([key, value]) => value === currentPlayer)
    .map(([key]) => key);
}
