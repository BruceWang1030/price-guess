import React from "react";
import axios from "axios";
import Zoom from "react-reveal/Zoom";
import "./App.css";

import Score from "./components/Score/Score";
import Menu from "./components/Menu/Menu";
import Card from "./components/Card/Card";
import PriceRange from "./components/PriceRange/PriceRange";
import Answer from "./components/Answer/Answer";
import Login from "./Login";
//Slider Part

class Home extends React.Component {
  constructor(props) {
    super(props);
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
        level: 0,
        username: ""
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
    setTimeout(() => {
      this.child_answer.current.flip();
    }, 100);
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
    setTimeout(() => {
      this.child_answer.current.flip();
    }, 100);
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

  levelUpCalculator() {
    var currentLevel = this.state.user_data.level;
    var nextLevel = parseInt(currentLevel) + 1;
    return nextLevel;
  }
  levelUp() {
    console.log("----Level Up user----");
    var url = "http://localhost:8080/data/users";
    // var url =
    // "http://ec2-18-224-199-146.us-east-2.compute.amazonaws.com:8080/data/users";
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
    // var url =
    // "http://ec2-18-224-199-146.us-east-2.compute.amazonaws.com:8080/data/users";
    axios
      .get(url, {
        params: {
          user_id: this.state.user_data.user_id
        }
      })
      .then(response => {
        console.log("home fetch user");
        console.log(response.data[0]);
        this.setState({
          user_data: response.data[0]
        });
      });
  }

  fetchSingleHouse() {
    var lucky = Math.floor(Math.random() * 100) + 1;
    console.log("----fetch house: " + lucky + " ----");
    var url = "http://localhost:8080/data/houses/id";
    // var url =
    // "http://ec2-18-224-199-146.us-east-2.compute.amazonaws.com:8080/data/houses/id";
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
    if (!this.props.user_id) {
      this.props.toApp();
    }
    this.setState({
      user_data: {
        user_id: this.props.user_id
      }
    });
    this.fetchSingleHouse();
    setTimeout(() => {
      this.fetchUser();
      console.log("home this.state.user_id:" + this.state.user_data.user_id);
    }, 100);

    console.log("component did mount");

    setTimeout(() => {
      this.fetchUser();
    }, 250);
  }

  render() {
    return (
      <div className="App">
        <Score
          score={this.state.user_data.level}
          name={this.state.user_data.username}
        />
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

export default Home;
