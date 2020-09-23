import React from "react";

const News = ({ winner, xIsnext }) => {
  let status;
  if (winner) {
    status = "Winner: " + (xIsnext ? "User 1" : "User 2");
  } else {
    status = "Next player: " + (xIsnext ? "X" : "O");
  }
  return <h1>{status}</h1>;
};

export default News;
