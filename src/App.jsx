import { useState } from "react";

// Importing the components for Player, GameBoard, and Log
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  // State to keep track of the turns played in the game
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  // State to track the current active player ("X" or "O")
  // const [activePlayer, setActivePlayer] = useState("X");

  // Function that handles when a player selects a square on the game board
  function handleSelectSquare(row, col) {
    // Add the new move to the gameTurns state
    setGameTurns((prevGameTurn) => {
      const currentPlayer = deriveActivePlayer(prevGameTurn);
      // Create a new updated turn with the selected square and active player
      const updatedTurns = [
        { square: { row: row, col: col }, player: currentPlayer },
        ...prevGameTurn,
      ];

      return updatedTurns;
    });
  }

  // Rendering the main game layout
  return (
    <main>
      <div id="game-container">
        {/* Display the players and highlight the active player */}
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>

        {/* Render the game board, passing down the function to handle selecting squares */}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          turns={gameTurns}
        />
      </div>

      {/* Render the log to display game moves (not yet implemented in this code) */}
      <Log userTurn={gameTurns} />
    </main>
  );
}

export default App;
