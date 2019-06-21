import React, {
  Component,
  forwardRef,
  useRef,
  useImperativeHandle
} from "react";
import axios from "axios";
import Zoom from "react-reveal/Zoom";
import Flip from "react-reveal/Flip";
import house from "./img/sample.jpg";
import qs from "qs";

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
  }
  flip() {
    this.setState({
      flipped: !this.state.flipped,
      clicked: true
    });
  }
  componentWillReceiveProps(props) {
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
  constructor(props) {
    super(props);
  }
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
        <button onClick={this.props.triggerLevelUp} className="btn-hint">
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

    if (props.getCurrentPoint) {
      props.getCurrentPoint(this.getMapPoint.bind(this));
    }
  }

  getMapPoint() {
    return this.value;
  }
  check() {
    console.log("check");
    return (
      this.state.value <= this.state.Price &&
      this.state.value + this.state.slider_len >= this.state.Price
    );
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  componentWillReceiveProps(props) {
    this.setState({
      Price: this.props.Price
    });
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

class Answer extends React.Component {
  constructor(props) {
    this.state = {
      Price: 0,
      isCorrect: false,
      showAnswer: true
    };
    this.flip = this.flip.bind(this);
  }
  flip() {
    this.setState({
      showAnswer: !this.showAnswer
    });
  }
  sentence(isCorrect) {
    if (isCorrect) {
      return "Congrats";
    } else {
      return "Almost there!";
    }
  }
  render() {
    return (
      <div>
        <Flip left when={this.show.showAnswer}>
          <p>
            {this.sentence(this.state.isCorrect)} The actual price is{" "}
            {this.state.Price}
          </p>
        </Flip>
        <button onClick={this.flip}>Change</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      house_data: {
        house_id: 0,
        BedroomCount: 0,
        BathroomCount: 0,
        Address: "",
        City: "",
        Province: "",
        Amenities: "",
        SizeInterior: "",
        Price: 0
      },
      user_data: {
        user_id: 1,
        level: 0
      }
    };
    this.child_price = React.createRef();
  }
  mainBtnClick = () => {};

  callChildPrice = () => {
    var isCorrect = this.child_price.current.check();
    if (isCorrect) {
      alert("correct");
    } else {
      alert("Wrong");
    }
  };
  levelUpCalculator() {
    var currentLevel = this.state.user_data.level;
    var nextLevel = parseInt(currentLevel) + 1;
    return nextLevel;
  }

  postNewUser() {
    console.log("----Post user----");
    var url = "http://localhost:3210/data/users";
    var today = new Date();
    axios
      .post(url, {
        params: {
          level: 1,
          craeted_at: today.toISOString()
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  levelUp() {
    console.log("----Update user----");
    console.log(this.state.user_data.user_id);
    console.log(this.state.user_data.level);
    var url = "http://localhost:3210/data/users";
    axios
      .put(url, {
        params: {
          user_id: 2,
          level: 30
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          user_data: {
            level: response.data.level
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchUser() {
    console.log("----fetch user: " + this.state.user_data.user_id + " ----");
    var url = "http://localhost:3210/data/users";
    axios
      .get(url, {
        params: {
          user_id: this.state.user_data.user_id
        }
      })
      .then(response => {
        console.log(response.data[0]);
        this.setState({
          user_data: response.data[0]
        });
      });
  }

  fetchSingleHouse() {
    console.log("----fetch house: " + this.state.house_data.house_id + " ----");
    var lucky = Math.floor(Math.random() * 3) + 1;
    var url = "http://localhost:3210/data/houses/id";
    axios
      .get(url, {
        params: {
          house_id: lucky
        }
      })
      .then(response => {
        console.log(response.data[0]);
        this.setState({
          house_data: response.data[0]
        });
      });
  }

  componentDidMount() {
    this.fetchSingleHouse();
    this.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <Score score={this.state.user_data.level} />
        <header className="App-header">
          <Card
            BedroomCount={this.state.house_data.BedroomCount}
            BathroomCount={this.state.house_data.BathroomCount}
            Address={this.state.house_data.Address}
            City={this.state.house_data.City}
            Province={this.state.house_data.Province}
            Amenities={this.state.house_data.Amenities}
            SizeInterior={this.state.house_data.SizeInterior}
          />
        </header>
        <div className="block-price">
          <PriceRange
            Price={this.state.house_data.Price}
            ref={this.child_price}
          />
        </div>
        <div className="block-btns">
          <Buttons triggerLevelUp={this.levelUp.bind(this)} />
        </div>

        <Zoom>
          <center style={{ margin: "25px" }}>
            <button
              className="btn btn-primary"
              style={{ width: "100px" }}
              onClick={this.levelUp.bind(this)}
            >
              PUT
            </button>
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
            <button
              className="btn btn-success"
              style={{ margin: "15px", width: "100px" }}
              onClick={this.callChildPrice}
            >
              Call
            </button>

            <div>------------</div>
          </center>
        </Zoom>
      </div>
    );
  }
}

export default App;
