import { useState } from "react";

// Importing the components for Player, GameBoard, and Log
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  // State to keep track of the turns played in the game
  const [gameTurns, setGameTurns] = useState([]);

  // State to track the current active player ("X" or "O")
  const [activePlayer, setActivePlayer] = useState("X");

  // Function that handles when a player selects a square on the game board
  function handleSelectSquare(row, col) {
    // Toggle between the players, switching from "X" to "O" or vice versa
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );

    // Update the game turns with the new move
    setGameTurns((prevGameTurn) => {
      // Determine which player is currently playing
      let currentPlayer = "X";

      // Check if the first turn was taken by "X" to decide the next player
      if (prevGameTurn.length > 0 && prevGameTurn[0].player === "X") {
        currentPlayer === "O"; // If X took the first move, set player to "O"
      }

      // Create a new updated turn with the selected square and active player
      const updatedTurns = [
        { square: { row: row, col: col }, player: currentPlayer },
        ...prevGameTurn,
      ];

      // The updated turns should be returned here to update the state
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
      <Log />
    </main>
  );
}

export default App;
