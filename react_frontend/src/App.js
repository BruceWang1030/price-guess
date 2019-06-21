import React, { Component } from "react";
import axios from "axios";
import Zoom from "react-reveal/Zoom";
import Flip from "react-reveal/Flip";
import house from "./img/sample.jpg";

import "./App.css";

class Score extends React.Component {
  render() {
    return <h1 className="score">Level: {this.props.score}</h1>;
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      clicked: false,
      BedroomCount: 0,
      BathroomCount: 0,
      SizeInterior: "",
      Address: "",
      City: "",
      Province: "",
      Amenities: "",
      Price: 0
    };
    this.flip = this.flip.bind(this);
    console.log("card state:");
    console.log(this.state);
  }
  flip() {
    console.log("flip clicked");
    this.setState({
      flipped: !this.state.flipped,
      clicked: true
    });
    console.log("card state (flip)");
    console.log(this.state);
  }
  componentWillReceiveProps(props) {
    console.log("Card component did mount:");
    this.setState({
      BedroomCount: this.props.BedroomCount,
      BathroomCount: this.props.BathroomCount,
      SizeInterior: this.props.SizeInterior,
      Address: this.props.Address,
      City: this.props.City,
      Province: this.props.Province,
      Amenities: this.props.Amenities,
      Price: this.props.Price
    });
    console.log("state updated:");
    console.log(this.state);
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
            <li>
              {this.props.BedroomCount} Bedrooms and {this.props.BathroomCount}{" "}
              Bathrooms
            </li>
            <li>Interior Size: {this.props.SizeInterior} sqft</li>
            <li>
              Address: {this.props.Address}, {this.props.City},{" "}
              {this.props.Province}
            </li>
            <li>{this.props.Amenities}</li>
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
    function help() {
      console.log("Help Shown");
    }
    function hint() {
      console.log("Hint shown");
    }
    return (
      <div className="btn-bottom">
        {/* <button onClick={help} className="btn-help">
          Help
        </button> */}
        <button onClick={hint} className="btn-hint">
          Hint
        </button>
        <button onClick={submit} className="btn-submit">
          Submit
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
      value: 100000,
      Price: 100000,
      slider_len: 800000,
      max: 1200000
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  componentWillReceiveProps(props) {
    console.log("PriceRange component did mount:");
    this.setState({
      Price: this.props.Price
    });
    console.log("state updated:");
    console.log(this.state);
  }
  render() {
    return (
      <div className="slidecontainer">
        <input
          type="range"
          min={100000}
          max={this.state.max}
          value={this.state.value}
          onChange={this.handleChange}
          step="10000"
          className="slider"
        />
        <div>
          ${this.state.value} - $
          {parseInt(this.state.value) + parseInt(this.state.slider_len)}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      house_data: [
        {
          house_id: 0,
          BedroomCount: 0,
          BathroomCount: 0,
          Address: "",
          City: "",
          Province: "",
          Amenities: "",
          SizeInterior: "",
          Price: 0
        }
      ],
      user_data: [
        {
          user_id: 1,
          level: 0
        }
      ]
    };
  }

  postNewUser(e) {
    e.preventDefault();
    var url = "http://localhost:3210/data/users";
    var today = new Date();
    axios
      .post(url, {
        level: 1,
        craeted_at: today.toISOString()
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchUser(e) {
    console.log("fetch user: id" + this.state.user_data[0].user_id);
    e.preventDefault();
    var url = "http://localhost:3210/data/users";
    axios
      .get(url, {
        params: {
          user_id: this.state.user_data[0].user_id
        }
      })
      .then(response => {
        console.log("response.data");
        console.log(response.data);
        this.setState({
          user_data: response.data
        });
      });
  }

  fetchSingleHouse(e) {
    var lucky = Math.floor(Math.random() * 3) + 1;
    console.log("lucky: " + lucky);
    e.preventDefault();
    var url = "http://localhost:3210/data/houses/id";
    axios
      .get(url, {
        params: {
          house_id: lucky
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

  componentDidMount() {
    console.log("App component mounted:");
    var lucky = Math.floor(Math.random() * 3) + 1;
    console.log("lucky: " + lucky);
    var url = "http://localhost:3210/data/houses/id";
    axios
      .get(url, {
        params: {
          house_id: lucky
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
      var arrayku = [
        "house_id: ",
        item.house_id,
        ,
        ", BedroomCount: ",
        item.BedroomCount,
        ", BathroomCount: ",
        item.BathroomCount,
        ", Address: ",
        item.Address,
        ", City: ",
        item.City,
        ", Province: ",
        item.Province,
        ", Amenities: ",
        item.Amenities,
        ", SizeInterior: ",
        item.SizeInterior,
        ", Price: ",
        item.Price
      ].join(" ");
      return <p key={index}>{arrayku}</p>;
    });
    console.log("App");
    console.log(this.state.house_data[0]);
    return (
      <div className="App">
        <Score score={this.state.user_data[0].level} />
        <header className="App-header">
          <Card
            BedroomCount={this.state.house_data[0].BedroomCount}
            BathroomCount={this.state.house_data[0].BathroomCount}
            Address={this.state.house_data[0].Address}
            City={this.state.house_data[0].City}
            Province={this.state.house_data[0].Province}
            Amenities={this.state.house_data[0].Amenities}
            SizeInterior={this.state.house_data[0].SizeInterior}
          />
        </header>
        <div className="block-price">
          <PriceRange Price={this.state.house_data[0].Price} />
        </div>
        <div className="block-btns">
          <Buttons />
        </div>

        <Zoom>
          <center style={{ margin: "25px" }}>
            <button
              className="btn btn-primary"
              style={{ width: "100px" }}
              onClick={this.postNewUser.bind(this)}
            >
              POST
            </button>

            <button
              className="btn btn-primary"
              style={{ width: "100px" }}
              onClick={this.fetchUser.bind(this)}
            >
              getUser
            </button>

            <button
              className="btn btn-success"
              style={{ margin: "15px", width: "100px" }}
              onClick={this.fetchSingleHouse.bind(this)}
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
