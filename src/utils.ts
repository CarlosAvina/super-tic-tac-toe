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

export function getWinner(
  gameState: any,
  currentPlayer: "x" | "o",
): "x" | "o" | null {
  let win = false;
  const currentPlays = Object.entries(gameState).filter(
    ([, value]) => value === currentPlayer,
  );
  POSIBLE_WINS_SHEET.forEach((solution) => {
    let ocurrences = 0;
    solution.forEach((index) => {
      const isCellFilled = currentPlays.some(
        ([play]) => Number(play) === index,
      );
      if (isCellFilled) ocurrences += 1;
    });

    if (ocurrences === 3) {
      win = true;
    }
  });

  if (win) return currentPlayer;

  return null;
}
