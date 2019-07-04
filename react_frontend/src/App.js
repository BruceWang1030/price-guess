import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      redirect: false
    };
    this.child_login = React.createRef();
    this.child_home = React.createRef();
  }
  setRedirect = () => {
    var id = this.child_login.current.passIdToHome();
    console.log("setTedirect: " + id);
    this.setState({
      user_id: id,
      redirect: true
    });
  };
  resetRedirect = () => {
    this.setState({
      redirect: false
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home/" />;
    } else {
      return <Redirect to="/" />;
    }
  };
  render() {
    const LoginPage = () => {
      return <Login toHome={this.setRedirect} ref={this.child_login} />;
    };
    const HomePage = () => {
      console.log("hi");
      return (
        <Home
          user_id={this.state.user_id}
          ref={this.child_home}
          toApp={this.resetRedirect}
        />
      );
    };
    return (
      <Router>
        <div>
          {this.renderRedirect()}
          <Route path="/" exact component={LoginPage} />
          <Route path="/home/" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
