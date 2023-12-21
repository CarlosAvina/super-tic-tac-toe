"use client";
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

export default function Home() {
  const [games, setGames] = React.useState<GamesGridType>(initialGames);
  const [unlockedGame, setUnlockedGame] = React.useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = React.useState<"x" | "o">("x");
  const [gameWinner, setGameWinner] = React.useState<"x" | "o" | "draw" | null>(
    null,
  );

  function resetGame() {
    setGames(initialGames);
    setUnlockedGame(null);
    setCurrentPlayer("x");
    setGameWinner(null);
  }

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
    <main className="flex flex-col gap-6 items-center text-center mt-5">
      <h1 className="text-5xl font-bold">Super tic-tac-toe</h1>
      <h2 className="text-2xl font-bold">
        Current player: {currentPlayer.toUpperCase()}
      </h2>
      <div className="grid grid-cols-3 p-1 border border-black bg-black">
        {Object.entries(games).map(([gameId, gameInfo]) =>
          gameInfo.winner ? (
            <b
              key={gameId}
              className="flex justify-center items-center font-bold text-5xl border-4 bg-white border-black"
            >
              {gameInfo.winner}
            </b>
          ) : (
            <div
              key={gameId}
              className={classNames(
                "grid grid-cols-3 grid-rows-3 bg-black gap-1 p-1 w-52 h-52",
                {
                  "bg-gray-300":
                    Number(gameId) !== unlockedGame && unlockedGame !== null,
                },
              )}
            >
              {Object.entries(gameInfo.game).map(([cellId, value]) => (
                <button
                  id={`${gameId}-${cellId}`}
                  key={cellId}
                  className={classNames("rounded-none p-0 text-2xl bg-white", {
                    "cursor-not-allowed":
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
      {gameWinner && (
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl">The winner is: x{gameWinner}</h2>
          <button
            className="bg-green-600 text-white rounded-full p-3 font-bold"
            onClick={resetGame}
          >
            Reset game
          </button>
        </div>
      )}
    </main>
  );
}
