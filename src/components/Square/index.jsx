import React from "react";
import PropTypes from "prop-types";

Square.propTypes = {
  isWinSquare: PropTypes.bool,
  onClick: PropTypes.func,
};
Square.defaultProps = {
  isWinSquare: false,
  onClick: null
};

function Square(props) {
  let className = "";
  const { isWinSquare, onClick } = props;
  if (isWinSquare) className = " square-winner";
  return (
    <button className={"square" + className} onClick={onClick}>
      {props.value}
    </button>
  );
}

export default Square;
