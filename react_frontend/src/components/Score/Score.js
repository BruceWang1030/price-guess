import React from "react";
import "./Score.css";

class Score extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h1 className="score">
        {this.props.name} Score: {this.props.score}
      </h1>
    );
  }
}

export default Score;
