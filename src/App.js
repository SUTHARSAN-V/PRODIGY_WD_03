import React, { useState } from "react";
import "./App.css";

function App() {
  // State to track the board and the current player
  const [board, setBoard] = useState(Array(9).fill(null)); // 9 cells initialized as null
  const [isXNext, setIsXNext] = useState(true); // Tracks if it's "X"'s turn
  const [winner, setWinner] = useState(null); // To store the winner ("X" or "O")
  const [isDraw, setIsDraw] = useState(false); // To store if the game is a draw

  // Winning combinations for Tic Tac Toe (index positions)
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Function to check for a winner
  const checkWinner = (board) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // "X" or "O"
      }
    }
    return null; // No winner
  };

  // Function to check for a draw
  const checkDraw = (board) => {
    return board.every(cell => cell !== null); // If every cell is filled, it's a draw
  };

  // Function to handle cell clicks
  const handleClick = (index) => {
    // If the cell is already filled or the game is over, do nothing
    if (board[index] || winner || isDraw) return;

    // Copy the board and update the clicked cell
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    // Update the state with the new board and toggle the player
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check if there's a winner after the move
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }

    // Check for a draw if no winner
    if (!gameWinner && checkDraw(newBoard)) {
      setIsDraw(true);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Reset the board
    setIsXNext(true); // Reset the turn to X
    setWinner(null); // Clear the winner
    setIsDraw(false); // Clear the draw status
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)} // Handle cell click
          >
            {cell}
          </div>
        ))}
      </div>

      {winner ? (
        <h2>{`Player ${winner} wins! 🎉`}</h2> // Winner message
      ) : isDraw ? (
        <h2>It's a draw! 🤝</h2> // Draw message
      ) : (
        <h2>{isXNext ? "Next Player: X" : "Next Player: O"}</h2> // Show who's turn it is
      )}

      {/* Reset Game Button */}
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
