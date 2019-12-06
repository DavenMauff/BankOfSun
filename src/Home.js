import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Buy from "./components/Buy";
import Pay from "./components/Pay";
import Transfer from "./components/Transfer";
import axios from "axios";
import jsSHA from "jssha";
import debit from "./images/debit.png";
import Modal from "react-responsive-modal";
import * as firebase from "firebase";
import Accounts from "./components/Accounts";

class Home extends Component {
  render() {
    const username = this.props.username;
    const password = this.props.password;
    console.log(username);
    return (
      <Router>
        <div className="index6">
          <Navigation />

          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Accounts {...props} username={username} password={password} />
              )}
            />
            <Route
              path="/buy"
              exact
              render={props => (
                <Buy {...props} username={username} password={password} />
              )}
            />
            <Route path="/pay" component={Pay} />
            <Route path="/transfer" component={Transfer} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
