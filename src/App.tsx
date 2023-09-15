import React, { SyntheticEvent } from "react";

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
  const [currentPlayer, setCurrentPlayer] = React.useState("x");

  function onCellClick(e: SyntheticEvent<HTMLButtonElement>) {
    const cellId = e.currentTarget.id;
    setGridValues((prev) => ({ ...prev, [cellId]: currentPlayer }));
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
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
            disabled={Boolean(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
