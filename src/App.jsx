import { useState } from "react";

// Importing the components for Player, GameBoard, and Log
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner() {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
}

function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  // State to keep track of the turns played in the game
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  // making a deep copy of an array
  let gameBoard = [...initialGameBoard].map((array) => [...array]);

  for (const turn of gameTurns) {
    // we add sqare and player from the updatedTurns in the App.js
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
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
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}

        {/* Render the game board, passing down the function to handle selecting squares */}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          turns={gameTurns}
        />
      </div>

      {/* Render the log to display game moves (not yet implemented in this code) */}
      <Log userTurn={gameTurns} />
    </main>
  );
}

export default App;
