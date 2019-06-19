import React, { Component } from "react";
import axios from "axios";
import Zoom from "react-reveal/Zoom";
import Flip from "react-reveal/Flip";
import house from "./img/sample.jpg";

import "./App.css";

class Score extends React.Component {
  render() {
    return <h1 className="score">Score: {this.props.score}</h1>;
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      clicked: false
    };
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
        <div className={"Card-Back" + flippedCSS}>
          <ul className="info-list">
            <li>3 Bedrooms and 2 Bathrooms</li>
            <li>
              2,300 ft<sup>2</sup>
            </li>
            <li>With a luxury swimming pool</li>
          </ul>
        </div>
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
  constructor() {
    super();
    this.state = {
      house_data: []
    };
  }

  klikPost(e) {
    e.preventDefault();
    var url = "http://localhost:3210/data/house";
    axios
      .post(url, {
        nama: this.inputnama.value,
        usia: this.inputusia.value
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.inputnama.value = "";
    this.inputusia.value = "";
  }

  klikGet(e) {
    e.preventDefault();
    var url = "http://localhost:3210/data/house";
    axios.get(url).then(response => {
      console.log(response.data);
      this.setState({
        house_data: response.data
      });
    });
  }

  klikGetOne(e) {
    var lucky = Math.floor(Math.random() * 4) + 1;
    console.log("lucky: " + lucky);
    e.preventDefault();
    var url = "http://localhost:3210/data/house/id";
    axios
      .get(url, {
        params: {
          no: lucky
        }
      })
      .then(response => {
        console.log("response.data");
        console.log(response.data);
        this.setState({
          house_data: response.data
        });
      });
  }

  render() {
    const dataMySQL = this.state.house_data.map((item, index) => {
      var arrayku = ["Nama: ", item.nama, ", Usia: ", item.usia, " th."].join(
        " "
      );
      return <p key={index}>{arrayku}</p>;
    });

    return (
      <div className="App">
        <Score score={33} />
        <header className="App-header">
          <Card />
        </header>
        <div className="block-price">
          <PriceRange value={300000} min={100000} max={500000} />
        </div>
        <div className="block-btns">
          <Buttons />
        </div>

        <Zoom>
          <center style={{ margin: "25px" }}>
            <button
              className="btn btn-primary"
              style={{ width: "100px" }}
              onClick={this.klikPost.bind(this)}
            >
              POST
            </button>

            <button
              className="btn btn-success"
              style={{ margin: "15px", width: "100px" }}
              onClick={this.klikGetOne.bind(this)}
            >
              GET
            </button>

            <div>{dataMySQL}</div>
            <div>------------</div>
          </center>
        </Zoom>
      </div>
    );
  }
}

export default App;
