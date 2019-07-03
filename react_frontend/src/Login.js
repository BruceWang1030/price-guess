import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameLogin: "",
      email: "",
      password: "",
      passwordLogin: "",
      user_id: 0
    };
    this.handleChangeRegister = this.handleChangeRegister.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  postNewUser() {
    console.log("----Register User " + this.state.username + "----");
    var url = "http://localhost:8080/auth/register";
    var today = new Date();
    axios
      .post(url, {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        level: 1,
        created_at: today.toISOString()
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getLogin() {
    console.log("----Login User " + this.state.usernameLogin + "----");
    var url = "http://localhost:8080/auth/login";
    console.log(
      "login username&password: " +
        this.state.usernameLogin +
        ", " +
        this.state.passwordLogin
    );
    axios
      .get(url, {
        params: {
          username: this.state.usernameLogin,
          password: this.state.passwordLogin
        }
      })
      .then(response => {
        console.log("reposnse");
        console.log(response);
        console.log("reposnse");
        if (response.statusText !== "OK") {
          alert("Username or passwordd wrong");
        } else {
          this.setState({
            user_id: response.data[0].user_id
          });
          console.log("user_id:" + this.state.user_id);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleRegister(event) {
    event.preventDefault();
    this.postNewUser();
  }
  handleLogin(event) {
    event.preventDefault();
    this.getLogin();
  }
  handleChangeRegister(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleChangeLogin(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Register Form</h1>
        <form onSubmit={this.handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChangeRegister}
            name="username"
            required
          />
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChangeRegister}
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChangeRegister}
            name="password"
            required
          />
          <input type="submit" value="Submit" />
        </form>
        <h1>Login Form</h1>
        <form onSubmit={this.handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={this.state.usernameLogin}
            onChange={this.handleChangeLogin}
            name="usernameLogin"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.passwordLogin}
            onChange={this.handleChangeLogin}
            name="passwordLogin"
            required
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
