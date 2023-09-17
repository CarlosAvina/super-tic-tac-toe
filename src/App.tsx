import React, { SyntheticEvent } from "react";
import classNames from "classnames";
import { getWinner } from "./utils";

type TicTacToeGame = {
  game: { [key: number]: string };
  winner: "x" | "o" | "draw" | null;
};

type GamesGridType = {
  [key: number]: TicTacToeGame;
};

const initialPlaygroundState = {
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

const initialGameState = {
  game: initialPlaygroundState,
  winner: null,
};

const initialGames = {
  1: initialGameState,
  2: initialGameState,
  3: initialGameState,
  4: initialGameState,
  5: initialGameState,
  6: initialGameState,
  7: initialGameState,
  8: initialGameState,
  9: initialGameState,
};

function App() {
  const [games, setGames] = React.useState<GamesGridType>(initialGames);
  const [unlockedGame, setUnlockedGame] = React.useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = React.useState<"x" | "o">("x");
  const [gameWinner, setGameWinner] = React.useState<"x" | "o" | "draw" | null>(
    null,
  );

  function onCellClick(e: SyntheticEvent<HTMLButtonElement>) {
    const id = e.currentTarget.id;
    const [gameId, cellId] = id.split("-");

    const gridValues = games[Number(gameId)].game;
    const nextGridValues = { ...gridValues, [cellId]: currentPlayer };
    const cellWinner = getWinner(nextGridValues, currentPlayer);
    const nextGameValues = {
      ...games,
      [Number(gameId)]: { game: nextGridValues, winner: cellWinner },
    };

    const globalGameScore = Object.entries(nextGameValues).reduce(
      (acc, current, index) => {
        return { ...acc, [index + 1]: current[1].winner };
      },
      {},
    );
    const globalWinner = getWinner(globalGameScore, currentPlayer);

    setGameWinner(globalWinner);
    setGames(nextGameValues);
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));

    const nextUnlockedGame = nextGameValues[Number(cellId)].winner
      ? null
      : Number(cellId);
    setUnlockedGame(nextUnlockedGame);
  }

  return (
    <main>
      <h1 className="font-bold">Super tic-tac-toe</h1>
      <div className="grid grid-cols-3 gap-1 p-1 border border-black">
        {Object.entries(games).map(([gameId, gameInfo]) =>
          gameInfo.winner ? (
            <b
              key={gameId}
              className="font-bold text-4xl border border-black text-center"
            >
              {gameInfo.winner}
            </b>
          ) : (
            <div
              key={gameId}
              className="grid grid-cols-3 grid-rows-3 bg-black gap-1 p-1 w-52 h-52 border border-black"
            >
              {Object.entries(gameInfo.game).map(([cellId, value]) => (
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
          ),
        )}
      </div>
      {gameWinner && <h2>Winner: {gameWinner}</h2>}
    </main>
  );
}

export default App;
