import React from "react";
import "./Score.css";

class Score extends React.Component {
  render() {
    return <h1 className="score">Score: {this.props.score}</h1>;
  }
}

export default Score;
