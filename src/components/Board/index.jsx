import React from "react";
import PropTypes from "prop-types";
import Square from "../Square";

Board.propTypes = {
  squares: PropTypes.array,
  onClick: PropTypes.func,
  win: PropTypes.array,
  boardSize: PropTypes.number,
};
Board.defaultProps = {
  squares: [],
  onClick: null,
  win: [],
  boardSize: 0
};

function Board(props) {
  const { squares, onClick, win, boardSize } = props;
  function renderSquares() {
    let square = [];
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(renderSquare(i * boardSize + j, squares, onClick, win));
      }
      square.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return square;
  }

  return <div>{renderSquares()}</div>;
}
function renderSquare(i, squares, onClick, win) {
  return (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => onClick(i)}
      isWinSquare={win && win.includes(i) ? true : false}
    />
  );
}

export default Board;
