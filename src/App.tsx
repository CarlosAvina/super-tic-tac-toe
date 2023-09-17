import React, { SyntheticEvent } from "react";
import classNames from "classnames";
import { getWinner } from "./utils";

type TicTacToeGame = {
  [key: number]: string;
};

type GamesGridType = {
  [key: number]: TicTacToeGame;
};

const initialState = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
};

const initialGames = {
  1: initialState,
  2: initialState,
  3: initialState,
  4: initialState,
  5: initialState,
  6: initialState,
  7: initialState,
  8: initialState,
  9: initialState,
};

function App() {
  const [games, setGames] = React.useState<GamesGridType>(initialGames);
  const [unlockedGame, setUnlockedGame] = React.useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = React.useState<"x" | "o">("x");
  const [winner, setWinner] = React.useState<"x" | "o" | null>();

  function onCellClick(e: SyntheticEvent<HTMLButtonElement>) {
    const id = e.currentTarget.id;
    const [gameId, cellId] = id.split("-");

    const gridValues = games[Number(gameId)];
    const nextGridValues = { ...gridValues, [cellId]: currentPlayer };
    setGames((prev) => ({ ...prev, [Number(gameId)]: nextGridValues }));
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    const winner = getWinner(nextGridValues, currentPlayer);
    setWinner(winner);
    setUnlockedGame(Number(cellId));
  }

  return (
    <main>
      <h1 className="font-bold">Super tic-tac-toe</h1>
      <div className="grid grid-cols-3 gap-1 p-1 border border-black">
        {Object.entries(games).map(([gameId, game]) => (
          <div
            key={gameId}
            className="grid grid-cols-3 grid-rows-3 bg-black gap-1 p-1 w-52 h-52 border border-black"
          >
            {Object.entries(game).map(([cellId, value]) => (
              <button
                id={`${gameId}-${cellId}`}
                key={cellId}
                className={classNames("rounded-none p-0", {
                  "bg-gray-400":
                    Number(gameId) !== unlockedGame && unlockedGame !== null,
                })}
                onClick={onCellClick}
                disabled={
                  Boolean(value) ||
                  (Number(gameId) !== unlockedGame && unlockedGame !== null)
                }
              >
                {value}
              </button>
            ))}
          </div>
        ))}
      </div>
      {winner && <h2>Winner: {winner}</h2>}
    </main>
  );
}

export default App;
