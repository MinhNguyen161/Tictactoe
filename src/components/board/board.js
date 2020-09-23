import React from "react";
import Square from "../square/square.js";
import { Row } from "react-bootstrap";

const Board = ({ squareClicked, squareList }) => {
  console.log("board", squareList);
  const renderSquare = (id) => {
    return (
      <Square squareClicked={squareClicked} squareList={squareList} id={id} />
    );
  };
  return (
    <div>
      <Row style={{ display: "flex" }}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Row>
      <Row style={{ display: "flex" }}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Row>
      <Row style={{ display: "flex" }}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Row>
    </div>
  );
};

export default Board;
