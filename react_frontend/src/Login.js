import React from "react";
import axios from "axios";
import Flip from "react-reveal/Flip";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameLogin: "",
      email: "",
      password: "",
      passwordLogin: "",
      user_id: 0,
      is_signin: true
    };
    this.handleChangeRegister = this.handleChangeRegister.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.switchSign = this.switchSign.bind(this);
  }
  switchSign() {
    this.setState({ is_signin: !this.state.is_signin });
  }
  postNewUser() {
    console.log("----Register User " + this.state.username + "----");
    var url =
      "http://ec2-18-224-199-146.us-east-2.compute.amazonaws.com:8080/auth/register";
    var today = new Date();
    axios
      .post(url, {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        level: 1,
        created_at: today.toISOString()
      })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.getRegisteredLogin();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  toHome() {
    this.props.toHome();
  }
  passIdToHome() {
    return this.state.user_id;
  }
  getRegisteredLogin() {
    console.log("----fetch user: " + this.state.username + " ----");
    //var url = "http://localhost:8080/data/users/username";
    var url =
      "http://ec2-18-224-199-146.us-east-2.compute.amazonaws.com:8080/data/users/username";
    axios
      .get(url, {
        params: {
          username: this.state.username
        }
      })
      .then(response => {
        if (response.data[0]) {
          this.setState({
            user_id: response.data[0].user_id
          });
          this.toHome();
        }
      });
  }
  getLogin() {
    console.log("----Login User " + this.state.usernameLogin + "----");
    var url =
      "http://ec2-18-224-199-146.us-east-2.compute.amazonaws.com:8080/auth/login";
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
        console.log(response.data);
        console.log("reposnse");
        if (!response.data[0]) {
          alert("Username or passwordd wrong");
        } else {
          this.setState({
            user_id: response.data[0].user_id
          });
          console.log("user_id:" + this.state.user_id);
          this.props.toHome();
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
      <div className="login-box">
        <div className="title">Huckleberry Game Demo</div>

        <div className="signup-box">
          <Flip left collapse when={!this.state.is_signin}>
            <div className="signup-title">Sign Up</div>
            <form className="signup-form" onSubmit={this.handleRegister}>
              <input
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChangeRegister}
                name="username"
                className="signup-input"
                required
              />
              <input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChangeRegister}
                name="email"
                className="signup-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChangeRegister}
                name="password"
                className="signup-input"
                required
              />
              <input
                type="submit"
                value="Submit"
                className="signup-btn login-btn login-blue"
              />
            </form>
            <div className="or">------------or------------</div>
            <button
              className="switch-btn login-btn login-red"
              onClick={this.switchSign}
            >
              Sign In
            </button>
          </Flip>
        </div>

        <div className="signin-box">
          <Flip left collapse when={this.state.is_signin}>
            <div className="signin-title">Sign In</div>
            <form className="signin-form" onSubmit={this.handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={this.state.usernameLogin}
                onChange={this.handleChangeLogin}
                name="usernameLogin"
                className="signin-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={this.state.passwordLogin}
                onChange={this.handleChangeLogin}
                name="passwordLogin"
                className="signin-input"
                required
              />
              <input
                type="submit"
                value="Submit"
                className="signin-btn login-btn login-red"
              />
            </form>
            <p className="or">------------or------------</p>
            <button
              className="switch-btn login-btn login-blue"
              onClick={this.switchSign}
            >
              Sign Up
            </button>
          </Flip>
        </div>
      </div>
    );
  }
}

export default Login;
