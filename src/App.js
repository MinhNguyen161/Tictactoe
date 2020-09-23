import React, { Component } from "react";
import Board from "./components/board/board.js";
import "./App.css";
import FacebookLogin from "react-facebook-login";

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
      move: 0,
      username: null,
      startTime: null,
      endTime: null
    };
  }
  responseFacebook = (response) => {
    console.log(response);
  };

  calculateTime = () => {
    let results = Math.round(
      (this.state.endTime - this.state.startTime) / 1000
    );
    return results;
  };

  postData = async () => {
    let data = new URLSearchParams();
    data.append("player", this.state.username);
    data.append("score", this.calculateTime());
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    console.log(data.toString());
    this.getData();
    // We actually don't care about the response ... do we?
  };
  getData = async () => {
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
  };

  resetGame = () => {
    let temp = [null, null, null, null, null, null, null, null, null];
    this.setState({
      squareList: temp,
      history: [],
      isXnext: true,
      winner: false,
      move: 0,
      endTime: null,
      startTime: null
    });
    console.log("RESET");
  };
  ChangeBoard = (index) => {
    // let temp = [...this.state.history];
    // temp.splice(index + 1, temp.length - index);
    console.log("choosen index", index);

    this.setState({
      ...this.state,
      squareList: this.state.history[index].array,
      isXnext: this.state.history[index].isXnext,
      move: index + 1
    });
  };
  GameOver = () => {
    if (!this.state.squareList.includes(null)) {
      console.log("Game over Draw !");
      this.setState({ ...this.state, winner: false, endTime: Date.now() });

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
        this.setState({ ...this.state, winner: true, endTime: Date.now() });
        return;
      }
    }
    //check Row
    for (let i = 0; i < 3; i++) {
      if (
        array[i] !== null &&
        array[i] === array[i + size] &&
        array[i + size] === array[i + size * 2]
      ) {
        this.setState({ ...this.state, winner: true, endTime: Date.now() });
        return;
      }
    }
    // diagU and diagDown
    if (array[0] !== null && array[0] === array[4] && array[4] === array[8]) {
      this.setState({ ...this.state, winner: true, endTime: Date.now() });

      return;
    }
    if (array[6] !== null && array[6] === array[4] && array[4] === array[2]) {
      this.setState({ ...this.state, winner: true, endTime: Date.now() });
      return;
    }
  };
  squareClicked = (id) => {
    if (this.state.history.length === 0) {
      this.setState({ ...this.setState, startTime: Date.now() });
    }
    if (this.state.winner) {
      alert("There's already a winner");
      return;
    }
    let array = this.state.squareList;
    if (array[id] !== null) {
      return;
    }

    let ga = this.state.move;
    if (ga === this.state.history.length) {
      console.log("normal move", ga, this.state.history.length);
      ga++;

      array[id] = this.state.isXnext ? "X" : "O";
      this.setState({
        squareList: [...array],
        move: ga,
        isXnext: !this.state.isXnext,
        history: [
          ...this.state.history,
          { array: array, isXnext: !this.state.isXnext }
        ]
      });
    } else {
      let index = this.state.move;
      let temp = [...this.state.history];

      temp.splice(index + 1, temp.length - index);
      array[id] = this.state.isXnext ? "X" : "O";

      console.log(this.state.history.length, "Callback move", index);

      this.setState({
        ...this.state,
        squareList: [...array],
        isXnext: !this.state.history[index - 1].isXnext,
        move: index + 1,
        history: temp
      });
    }

    this.GameChecker();
    this.GameOver();
  };

  render() {
    console.log(this.state.username);
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
          <button
            onClick={() => {
              this.resetGame();
            }}
          >
            {" "}
            ResetGame
          </button>
          <History
            history={this.state.history}
            ChangeBoard={this.ChangeBoard}
          />
          {console.log("Now you are on move", this.state.move)}
          <button
            onClick={() => {
              this.postData();
            }}
          >
            {" "}
            Post Data
          </button>
        </div>
        <div>
          <h1>START TIME: {this.state.startTime}</h1>
          <h1>END TIME: {this.state.endTime}</h1>
          {/* <h1>TOTAL TIME: {this.calculateTime() / 1000}</h1> */}
          <div>
            <h2>LOGIN WITH FACEBOOK </h2>
            <div>
              <FacebookLogin
                appId="2786531871670060" //APP ID NOT CREATED YET
                fields="name,email,picture"
                callback={(response) => {
                  this.responseFacebook(response);
                  this.setState({
                    ...this.setState,
                    username: response.name
                  });
                }}
              />
            </div>
            <h2> {this.state.username} </h2>

            {/* <FacebookLogin
              appId="2786531871670060" //APP ID NOT CREATED YET
              fields="name,email,picture"
              callback={(response) => {
                this.responseFacebook(response);
                this.setState({ ...this.setState, username: response.name });
              }}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

// 1. Have calculate score ( duration play time unitl you win)
// 2. Post your username + score to API
// 3.
