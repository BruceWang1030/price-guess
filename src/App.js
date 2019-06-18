import React from "react";
import house from "./img/sample.jpg";
import Slider from "react-toolbox/lib/slider";
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
  state = {
    slider1: 5
  };
  handleChange = (slider, value) => {
    const newState = {};
    newState[slider] = value;
    this.setState(newState);
  };
  render() {
    return (
      <section>
        <p>Normal slider</p>
        <Slider
          min={1}
          max={100}
          value={this.state.slider1}
          onChange={this.handleChange.bind(this, "slider1")}
        />
      </section>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Score score="64" />
      <header className="App-header">
        <HousePicture />
      </header>
      <div>
        <PriceRange />
      </div>
      <div>
        <Buttons />
      </div>
    </div>
  );
}
export default App;
