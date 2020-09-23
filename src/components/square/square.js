import React from "react";
import styles from "./square.module.css";

const Square = ({ squareClicked, id, squareList }) => {
  return (
    <div className={styles["square-box"]} onClick={() => squareClicked(id)}>
      <h1>{squareList[id]}</h1>
    </div>
  );
};

export default Square;
