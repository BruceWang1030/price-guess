import React from "react";
import house from "../../img/sample.jpg";
import "./Card.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      house_data: {},
      flipped: false,
      clicked: false
    };
    this.flip = this.flip.bind(this);
  }
  flip() {
    this.setState({
      flipped: !this.state.flipped,
      clicked: true
    });
  }
  reset() {
    console.log("reset card");
    if (this.state.flipped) {
      this.flip();
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      house_data: this.props.house_data
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
              {this.props.house_data.BedroomCount} Bedrooms and{" "}
              {this.props.house_data.BathroomCount} Bathrooms
            </li>
            <li>Interior Size: {this.props.house_data.SizeInterior} sqft</li>
            <li>
              Address: {this.props.house_data.Address},{" "}
              {this.props.house_data.City}, {this.props.house_data.Province}
            </li>
            <li>{this.props.house_data.Amenities || ""}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Card;
