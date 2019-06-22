import React from "react";
import "./PriceRange.css";

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
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({
      value: 100000
    });
  }
  check() {
    console.log("check");
    console.log("this.state.value");
    console.log(this.state.value);
    console.log("this.state.Price");
    console.log(this.state.Price);
    console.log("this.state.slider_len");
    console.log(this.state.slider_len);
    console.log(
      "this.state.value <= this.state.Price && this.state.value + this.state.slider_len >= this.state.Price: "
    );
    console.log(
      this.state.value <= this.state.Price &&
        this.state.value + this.state.slider_len >= this.state.Price
    );

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
