import React from "react";
import axios from "axios";
import Zoom from "react-reveal/Zoom";
import "./App.css";

import Score from "./components/Score/Score";
import Card from "./components/Card/Card";
import PriceRange from "./components/PriceRange/PriceRange";
import Answer from "./components/Answer/Answer";
import Login from "./Login";
//Slider Part

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
      },
      value: 100000,
      is_correct: false
    };
    this.child_price = React.createRef();
    this.child_answer = React.createRef();
    this.child_card = React.createRef();
    this.setResult = this.setResult.bind(this);
  }
  setResult(isCorrect) {
    this.setState({
      is_correct: isCorrect
    });
  }
  mainBtnClick = () => {
    var isCorrect = this.child_price.current.check();
    this.setResult(isCorrect);
    this.child_answer.current.flip();
    console.log("isCorrect: " + isCorrect);
    if (isCorrect) {
      console.log("correct");
      this.levelUp();
    } else {
      console.log("incorrect");
    }
    setTimeout(() => {
      this.child_answer.current.flip();
      this.child_card.current.reset();
      this.child_price.current.reset();
      this.fetchSingleHouse();
    }, 3000);
  };
  skipBtnClick = () => {
    this.setResult(false);
    this.child_answer.current.flip();
    console.log("skipped");
    setTimeout(() => {
      this.child_answer.current.flip();
    }, 2500);
    setTimeout(() => {
      this.child_card.current.reset();
      this.child_price.current.reset();
      this.fetchSingleHouse();
    }, 3000);
  };

  postNewUser() {
    console.log("----Post user----");
    var url = "http://localhost:8080/data/users";
    var today = new Date();
    axios
      .post(url, {
        level: 5,
        created_at: today.toISOString()
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  levelUpCalculator() {
    var currentLevel = this.state.user_data.level;
    var nextLevel = parseInt(currentLevel) + 1;
    return nextLevel;
  }
  levelUp() {
    console.log("----Level Up user----");
    var url = "http://localhost:8080/data/users";
    var this_user = this.state.user_data.user_id;
    var nextLevel = this.levelUpCalculator();
    axios
      .put(url, {
        user_id: this_user,
        level: nextLevel
      })
      .then(response => {
        console.log(response);
        this.setState({
          user_data: {
            level: response.data.level,
            user_id: response.data.user_id
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchUser() {
    console.log("----fetch user: " + this.state.user_data.user_id + " ----");
    var url = "http://localhost:8080/data/users";
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
    var lucky = Math.floor(Math.random() * 100) + 1;
    var url = "http://localhost:8080/data/houses/id";
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
        <Login />
        <Score score={this.state.user_data.level} />
        <header className="App-header">
          <Card house_data={this.state.house_data} ref={this.child_card} />
        </header>
        <div className="block-price">
          <PriceRange
            Price={this.state.house_data.Price}
            value={this.state.value}
            score={this.state.user_data.level}
            ref={this.child_price}
          />
        </div>
        <div>
          <Answer
            Price={this.state.house_data.Price}
            isCorrect={this.state.is_correct}
            ref={this.child_answer}
          />
        </div>

        <Zoom>
          <center className="btns-bottom">
            <button
              className="btn red"
              style={{ margin: "15px", width: "100px" }}
              onClick={this.skipBtnClick}
            >
              Skip
            </button>
            <button
              className="btn blue"
              style={{ margin: "15px", width: "100px" }}
              onClick={this.mainBtnClick}
            >
              Submit
            </button>
          </center>
        </Zoom>
      </div>
    );
  }
}

export default App;
