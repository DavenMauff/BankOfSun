import React, { Component } from "react";
import "./login.css";
import axios from "axios";
import jsSHA from "jssha";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-responsive-modal";
import ReactDOM from "react-dom";
import Home from "./Home";
import Accounts from "./components/Accounts";

class login extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      clients: [],
      name: "",
      password: "",
      open: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleChangePass(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.name);
    console.log(this.state.password);
    event.preventDefault();
    this.login();
  }

  handleModal() {
    this.setState({ open: false });
  }

  login() {
    const user = this.state.name;
    const password = this.state.password;

    const hmac = new jsSHA("SHA-256", "TEXT");
    hmac.setHMACKey(password, "TEXT");
    hmac.update(user);
    hmac.update(
      Date.now()
        .toString(36)
        .substring(0, 4)
    );

    const token = `${hmac.getHMAC("HEX")}%${user}`;

    const api = axios.create({
      baseURL: "http://45.77.58.134:8080",
      headers: { Authorization: "Bearer " + token }
    });

    (async () => {
      try {
        const res = await api.get("/clients");
        console.log(res.data[0]);

        ReactDOM.render(
          <Home username={user} password={password} />,
          document.getElementById("root")
        );
      } catch {
        console.log("username or password incorrect");
        this.setState({ open: true });
        console.log(this.state.open);
      }
    })();
  }

  render() {
    const { open } = this.state;
    return (
      <div className="index2" id="LoginForm">
        <Modal
          style={{ width: "600px" }}
          open={open}
          onClose={this.handleModal}
          center
        >
          <p className="p-5">Username or Password incorrect</p>
          <button className="btn modal-button" onClick={this.handleModal}>
            Done
          </button>
        </Modal>
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Personal User Login</h2>
                <p>Please enter your username and password</p>
              </div>
              <form id="Login" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={this.state.value}
                    onChange={this.handleChangePass}
                  />
                </div>
                <div className="forgot">
                  <a href="#">Forgot Password</a>
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default login;
