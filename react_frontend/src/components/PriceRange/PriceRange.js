import React from "react";
import "./PriceRange.css";

class PriceRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 100000,
      Price: this.props.Price,
      slider_len: 800000,
      max: 1200000,
      score: 1,
      percent: 40
    };
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({
      value: 100000
    });
  }
  slider_percent(score) {
    if (score > 50) {
      if (score > 300) return 5;
      else if (score > 200) return 8;
      else if (score > 100) return 10;
      else return 12;
    } else {
      if (score > 20) return 15;
      else if (score > 5) return 20;
      else if (score > 1) return 30;
      else return 40;
    }
  }
  check() {
    return (
      this.state.value <= this.props.Price &&
      this.state.value + this.state.slider_len >= this.props.Price
    );
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  componentWillReceiveProps(props) {
    this.setState({
      Price: this.props.Price,
      score: this.props.score,
      percent: this.slider_percent(this.props.score),
      slider_len: (2000000 * this.slider_percent(this.props.score)) / 100,
      max: 2000000 - (2000000 * this.slider_percent(this.props.score)) / 100
    });
  }
  render() {
    return (
      <div className="slidecontainer">
        <style>
          {`:root{
              --thumb-percent: ${this.state.percent}%
            }`}
        </style>
        <input
          type="range"
          min={100000}
          max={this.state.max}
          value={this.state.value}
          onChange={this.handleChange}
          step="1000"
          className="myslider"
        />
        <div>
          ${this.state.value} - $
          {parseInt(this.state.value) + parseInt(this.state.slider_len)}
        </div>
      </div>
    );
  }
}

export default PriceRange;
