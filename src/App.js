import React from "react";
import house from "./img/sample.jpg";
import "./App.css";

class Score extends React.Component {
  render() {
    return <h1 className="score">Score: {this.props.score}</h1>;
  }
}

class HousePicture extends React.Component {
  render() {
    function myfunction() {
      console.log("Clicked");
    }
    return (
      <button className="btn-img">
        <div>
          <img
            src={house}
            alt="my house"
            onClick={myfunction}
            className="house-img"
          />
        </div>
      </button>
    );
  }
}
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flipped: false, clicked: false };
    this.flip = this.flip.bind(this);
  }
  flip() {
    console.log("flip clicked");
    this.setState({
      flipped: !this.state.flipped,
      clicked: true
    });
  }
  render() {
    var flippedCSS = this.state.flipped
      ? " Card-Back-Flip"
      : " Card-Front-Flip";
    if (!this.state.clicked) flippedCSS = "";
    return (
      <div className="Card" onClick={this.flip}>
        <div className={"Card-Front" + flippedCSS}>
          <h3>
            <img src={house} alt="my house" className="house-img" />
          </h3>
        </div>
        <div className={"Card-Back" + flippedCSS}>aaaaa</div>
      </div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    function submit() {
      console.log("submitted");
    }
    function skip() {
      console.log("skipped");
    }
    function hint() {
      console.log("Hint shown");
    }
    return (
      <div className="btn-bottom">
        <button onClick={skip} className="btn-skip">
          Skip
        </button>
        <button onClick={submit} className="btn-submit">
          Submit
        </button>
        <button onClick={hint} className="btn-hint">
          Hint
        </button>
      </div>
    );
  }
}

//Slider Part
class PriceRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      min: this.props.min,
      max: this.props.max
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <label>
          <input
            id="typeinp"
            type="range"
            min={this.state.min}
            max={this.state.max}
            value={this.state.value}
            onChange={this.handleChange}
            step="10000"
            className="price-range"
          />
        </label>
        <div>${this.state.value}</div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Score score="64" />
        <header className="App-header">
          <Card />
        </header>
        <div>
          <PriceRange value={300000} min={100000} max={500000} />
        </div>
        <div>
          <Buttons />
        </div>
      </div>
    );
  }
}

export default App;
