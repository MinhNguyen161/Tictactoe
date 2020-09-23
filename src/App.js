import React, { Component } from "react";
import Board from "./components/board/board.js";
import "./App.css";
import News from "./components/news/news.js";

import History from "./components/history/history.js";
let size = 3;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squareList: [null, null, null, null, null, null, null, null, null],
      isXnext: true,
      winner: false,
      history: [],
    };
  }
  ChangeBoard = (index) => {
    this.setState({
      ...this.state,
      squareList: this.state.history[index].array,
      isXnext: this.state.history[index].isXnext,
    });
  };
  GameOver = () => {
    if (!this.state.squareList.includes(null)) {
      console.log("Game over Draw !");
      return;
    }
  };
  GameChecker = () => {
    //check Column
    let array = this.state.squareList;
    for (let i = 0; i < 8; i += size) {
      if (
        array[i] !== null &&
        array[i] === array[i + 1] &&
        array[i + 1] === array[i + 2]
      ) {
        this.setState({ ...this.state, winner: true });
        return;
      }
    }
    //check Row
    for (let i = 0; i < 2; i++) {
      if (
        array[i] !== null &&
        array[i] === array[i + size] &&
        array[i + size] === array[i + size * 2]
      ) {
        this.setState({ ...this.state, winner: true });
        console.log("ga");
        return;
      }
    }
    // diagU and diagDown
    if (array[0] !== null && array[0] === array[4] && array[4] === array[8]) {
      this.setState({ ...this.state, winner: true });

      return;
    }
    if (array[6] !== null && array[6] === array[4] && array[4] === array[2]) {
      this.setState({ ...this.state, winner: true });
      return;
    }
  };
  squareClicked = (id) => {
    let array = this.state.squareList;
    if (array[id] !== null) {
      alert("Choose Another Square");
      return;
    }
    array[id] = this.state.isXnext ? "X" : "O";

    this.setState({
      squareList: [...array],
      isXnext: !this.state.isXnext,
      history: [
        ...this.state.history,
        { array: array, isXnext: !this.state.isXnext },
      ],
    });
    this.GameChecker();
    this.GameOver();
  };

  render() {
    return (
      <div className="container row" style={{ display: "flex" }}>
        <div className="col">
          <Board
            squareClicked={this.squareClicked}
            squareList={this.state.squareList}
          />
        </div>
        <div className="col">
          <News winner={this.state.winner} xIsnext={this.state.isXnext} />
          <History
            history={this.state.history}
            ChangeBoard={this.ChangeBoard}
          />
        </div>
      </div>
    );
  }
}
