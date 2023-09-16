import React, { SyntheticEvent } from "react";
import { getWinner } from "./utils";

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

function App() {
  const [gridValues, setGridValues] = React.useState(initialState);
  const [currentPlayer, setCurrentPlayer] = React.useState<"x" | "o">("x");
  const [winner, setWinner] = React.useState<"x" | "o" | null>();

  function onCellClick(e: SyntheticEvent<HTMLButtonElement>) {
    const cellId = e.currentTarget.id;
    const nextGridValues = { ...gridValues, [cellId]: currentPlayer };
    setGridValues(nextGridValues);
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    const winner = getWinner(nextGridValues, currentPlayer);
    setWinner(winner);
  }

  return (
    <main>
      <h1 className="font-bold">Super tic-tac-toe</h1>
      <div className="grid grid-cols-3 bg-black gap-1 p-1 w-52 h-52 border border-black">
        {Object.entries(gridValues).map(([key, value]) => (
          <button
            id={key}
            key={key}
            className="rounded-none"
            onClick={onCellClick}
            disabled={Boolean(value) || Boolean(winner)}
          >
            {value}
          </button>
        ))}
      </div>
      {winner && <h2>Winner: {winner}</h2>}
    </main>
  );
}

export default App;
