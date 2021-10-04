import React, { useState } from "react";
import calculateWinner from "../../helper/utils";
import Board from "../Board";

function Game() {
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascending, setAscending] = useState(true);
  const [boardSize, setBoardSize] = useState(5);
  const [history, setHistory] = useState([
    {
      squares: Array(boardSize * boardSize).fill(null),
      lastIndex: null,
    },
  ]);

  function handleChange(event) {
    const oldSize = boardSize;
    const newSize = +event.target.value;
    if (newSize > 20 || newSize < 5) return;
    const currentHistory = [...history];
    let newHistory = [];
    if (newSize < oldSize) {
      currentHistory.forEach((vers) => {
        let newArr = [];
        while (vers.squares.length)
          newArr.push(vers.squares.splice(0, oldSize));
        newArr.forEach((x) => x.pop());
        newArr.pop();
        newHistory.push({
          squares: [].concat(...newArr),
          lastIndex: vers.lastIndex,
        });
      });
    }
    if (newSize > oldSize) {
      currentHistory.forEach((vers) => {
        let newArr = [];
        while (vers.squares.length)
          newArr.push(vers.squares.splice(0, oldSize));
        newArr.forEach((x) => x.push(null));
        newArr.push(Array(newSize).fill(null));
        newHistory.push({
          squares: [].concat(...newArr),
          lastIndex: vers.lastIndex,
        });
      });
    }
    setHistory(newHistory);
    setBoardSize(+event.target.value);
  }
  
  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      currentHistory.concat([
        {
          squares: squares,
          lastIndex: i,
        },
      ])
    );
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function handleSort() {
    setAscending(!ascending);
  }

  const currentHistory = history;
  const current = currentHistory[stepNumber];
  const winner = calculateWinner(current.squares);

  let moves = currentHistory.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button
          className={move === stepNumber ? "selected-item" : ""}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });
  if (!ascending) moves = moves.reverse();

  let status;
  if (winner) {
    status = "Winner: " + winner.square;
  } else {
    if (stepNumber === boardSize * boardSize) status = "Game ended in a draw";
    else status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function getPosition() {
    const index = current.lastIndex;
    if (index !== null)
      return `Position (col,row)=(${1 + (index % boardSize)}, ${
        1 + Math.floor(index / boardSize)
      })`;
    return `Game start`;
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          win={winner !== null ? winner.line : null}
          boardSize={boardSize}
        />
      </div>
      <div className="game-option">
        <div>
          <strong>Option</strong>
        </div>
        <div>Board size</div>
        <input
          type="number"
          value={boardSize}
          min={5}
          max={20}
          onChange={handleChange}
        />
        <br /> <br />
        <div>Order</div>
        <button onClick={() => handleSort()}>
          {ascending === true ? "Desceding order" : "Ascending order"}
        </button>
        <ol>{moves}</ol>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{getPosition()}</div>
      </div>
    </div>
  );
}

export default Game;
