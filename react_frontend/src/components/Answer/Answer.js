import React from "react";
import Flip from "react-reveal/Flip";
import "./Answer.css";

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Price: 100000,
      isCorrect: false,
      showAnswer: false
    };
    this.flip = this.flip.bind(this);
  }
  flip() {
    this.setState({
      showAnswer: !this.state.showAnswer
    });
  }
  sentence(isCorrect) {
    if (isCorrect) {
      return "Congrats";
    } else {
      return "Almost there!";
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      Price: this.props.Price,
      isCorrect: this.props.isCorrect
    });
  }
  render() {
    return (
      <div>
        <Flip left when={this.state.showAnswer}>
          <div className={"answer-block-" + this.state.isCorrect}>
            <p>
              {this.sentence(this.state.isCorrect)} The actual price is{" "}
              {this.props.Price}
            </p>
          </div>
        </Flip>
      </div>
    );
  }
}

export default Answer;
