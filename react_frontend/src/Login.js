import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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
  handleSubmit(event) {
    alert(
      this.state.username + "," + this.state.email + "," + this.state.password
    );
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({
      username: event.target.username,
      email: event.target.email,
      password: event.target.password
    });
  }
  render() {
    return (
      <div>
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input type="submit" value="Submit" />
        </form>
        <h1>Login Form</h1>
        <form action="auth/login" method="POST">
          <input type="text" name="username" placeholder="Username" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
