import { useState } from 'react';
import './App.css';

// Cell Component: Represents each cell in the tic-tac-toe board
function Cell({ value, onCellClick, onHoverCell, onLeaveCell, hoverValue }) {
  return (
    <button
      className="cell"
      onClick={onCellClick} // Handle cell click
      onMouseEnter={onHoverCell} // Handle mouse enter
      onMouseLeave={onLeaveCell} // Handle mouse leave
      style={{
        height: '100px',
        width: '100px',
        margin: '8px',
        backgroundColor: hoverValue ? '#d3d3d3' : 'white', // Change background color on hover
      }}
    >
      {hoverValue || value} {/* Show hoverValue or actual cell value */}
    </button>
  );
}

function App() {
  // State hooks
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(''))); // Board state: 3x3 grid of empty strings
  const [turn, setTurn] = useState(true); // true for X's turn, false for O's turn
  const [winner, setWinner] = useState(null); // Winner state: null until a player wins
  const [isTie, setIsTie] = useState(false); // Tie state: false until game is a tie
  const [hoverBoard, setHoverBoard] = useState(Array(3).fill(Array(3).fill(''))); // Hover board state for showing X or O on hover

  // Handle cell click
  const handleClick = (row, col) => {
    if (board[row][col] !== '' || winner || isTie) return; // Ignore click if cell is not empty or game is over

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? (turn ? 'X' : 'O') : cell
      )
    );

    setBoard(newBoard);
    setTurn(!turn); // Toggle turn
    checkWinner(newBoard); // Check for winner
  };

  // Handle mouse hover over a cell
  const onHoverCell = (row, col) => {
    if (board[row][col] !== '' || winner || isTie) return; // Ignore hover if cell is not empty or game is over

    const newHoverBoard = hoverBoard.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? (turn ? 'X' : 'O') : ''
      )
    );

    setHoverBoard(newHoverBoard);
  };

  // Handle mouse leave a cell
  const onLeaveCell = () => {
    const newHoverBoard = hoverBoard.map(row => row.map(() => ''));
    setHoverBoard(newHoverBoard);
  };

  // Check for a winner or tie
  const checkWinner = (board) => {
    const lines = [
      // Rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // Columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (let line of lines) {
      if (line[0] && line[0] === line[1] && line[0] === line[2]) {
        setWinner(line[0]); // Set winner if a line matches
        return;
      }
    }

    if (board.every(row => row.every(cell => cell))) {
      setIsTie(true); // Set tie if all cells are filled and no winner
    }
  };

  return (
    <>
      <div className="container" style={{ marginTop: '-200px' }}>
        <h1>Tic-Tac-Toe</h1>
        <span style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '10px' }}>Player 1: "X"</span>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Player 2: "O"</span>
        <h2>{winner ? `${winner} Wins!` : isTie ? "It's a Tie!" : turn ? "X's Turn" : "O's Turn"}</h2>
      </div>
      <div className="game" style={{ marginTop: '100px' }}>
        <div className="game-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <Cell
                  key={colIndex}
                  value={cell}
                  onCellClick={() => handleClick(rowIndex, colIndex)}
                  onHoverCell={() => onHoverCell(rowIndex, colIndex)}
                  onLeaveCell={() => onLeaveCell()}
                  hoverValue={hoverBoard[rowIndex][colIndex]}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
