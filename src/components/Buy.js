import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import afrihost from "../images/afrihost.jpg";
import cellc from "../images/cell-c.png";
import eskom from "../images/eskom.jpg";
import mtn from "../images/mtn.png";
import telkom from "../images/telkom-mobile.jpg";
import vodacom from "../images/vodacom.jpg";
import Modal from "react-responsive-modal";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Navigation from "./Navigation";
import Pay from "./Pay";
import Transfer from "./Transfer";
import axios from "axios";
import jsSHA from "jssha";
import debit from "../images/debit.png";
import * as firebase from "firebase";
import Login from "../login";

class Buy extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      type: "Airtime",
      ref: "",
      amount: 0,
      clientAccounts: []
    };
    this.handleModal = this.handleModal.bind(this);
    this.APIcall = this.APIcall.bind(this);
  }
  handleModal() {
    this.setState({ open: !this.state.open });
    this.informationPass();
  }

  handleType(x) {
    this.setState({ type: x });
    console.log(this.state.type);
    console.log("Hello");
  }

  getInformation() {
    console.log(document.getElementById("Type").value);
    console.log(document.getElementById("Amount").value);
    console.log(document.getElementById("tel-input").value);
  }

  APIcall() {
    const username = this.props.username;
    const password = this.props.password;
    console.log(username);
    console.log(password);
    const hmac = new jsSHA("SHA-256", "TEXT");
    hmac.setHMACKey(this.props.password, "TEXT");
    hmac.update(this.props.username);
    hmac.update(
      Date.now()
        .toString(36)
        .substring(0, 4)
    );

    const token = `${hmac.getHMAC("HEX")}%${username}`;

    const api = axios.create({
      baseURL: "http://45.77.58.134:8080",
      headers: { Authorization: "Bearer " + token }
    });

    (async () => {
      const res = await api.get("/clients");
      if ()
      const accounts = await api.get(`/accounts/${res.data[0]._id}`);
      const body = {
        type: document.getElementById("Type").value,
        src: accounts.data._id,
        dest: "",
        amount: parseInt(document.getElementById("Amount").value) * -1,
        ref: document.getElementById("tel-input").value
      };
      console.log(accounts._id);
      await api.post(`/transactions`, body);
    })();
  }

  fuckReact() {
    console.log(this.props.username);
    console.log(this.props.password);
  }

  informationPass() {
    const username = this.props.username;
    const password = this.props.password;
    const hmac = new jsSHA("SHA-256", "TEXT");
    hmac.setHMACKey(password, "TEXT");
    hmac.update(username);
    hmac.update(
      Date.now()
        .toString(36)
        .substring(0, 4)
    );

    const token = `${hmac.getHMAC("HEX")}%${username}`;

    const api = axios.create({
      baseURL: "http://45.77.58.134:8080",
      headers: { Authorization: "Bearer " + token }
    });
    (async () => {
      const res = await api.get("/clients");
      const accounts = await api.get(`/accounts/${res.data[0]._id}`);
      this.setState({ clientAccounts: accounts.data });
    })();
    this.fuckReact();
  }

  render() {
    const { open } = this.state;
    return (
      <div className="index7">
        <Modal open={open} onClose={this.handleModal}>
          <h4>MTN</h4>
          <div className="form-group">
            <label>Please select bundle type</label>
            <select ref="Type" className="form-control" id="Type">
              <option value="Airtime">Airtime</option>
              <option value="SMS Bundles">SMS Bundles</option>
              <option value="Data Bundle">Data Bundle</option>
            </select>
          </div>
          <div className="form-group">
            <label>Please select value</label>
            <select ref="Amount" className="form-control" id="Amount">
              <option value="100">R100</option>
              <option value="200">R200</option>
              <option value="300">R300</option>
            </select>
          </div>
          <div className="form-group">
            <label for="mobileNumber">Please input mobile number:</label>
            <input
              className="form-control"
              type="tel"
              placeholder="08X-XXX-XXXX"
              id="tel-input"
            />
          </div>
          <div className="form-group">
            <label>Please select account</label>
            <select ref="Amount" className="form-control" id="Account">
              {this.state.clientAccounts.map(x => (
                <option value="10000">
                  {`${x.type}`.charAt(0).toUpperCase() + `${x.type}`.slice(1)} -
                  R{`${x.balance}` / 100}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-3">
            <button onClick={this.APIcall} className="btn btn-primary">
              Submit
            </button>
          </div>
        </Modal>
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <img src={mtn} />
              <div className="pt-3">
                <button
                  onClick={this.handleModal}
                  type="button"
                  className="btn btn-light btn-sm"
                >
                  Select
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <img src={vodacom} />
              <div className="pt-3">
                <button
                  onClick={this.handleModal}
                  type="button"
                  className="btn btn-light btn-sm"
                >
                  Select
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <img src={cellc} />
              <div className="pt-3">
                <button
                  onClick={this.handleModal}
                  type="button"
                  className="btn btn-light btn-sm"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <img src={telkom} />
              <div className="pt-3">
                <button
                  onClick={this.handleModal}
                  type="button"
                  className="btn btn-light btn-sm"
                >
                  Select
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <img src={afrihost} />
              <div className="pt-3">
                <button
                  onClick={this.handleModal}
                  type="button"
                  className="btn btn-light btn-sm"
                >
                  Select
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <img src={eskom} />
              <div className="pt-3">
                <button
                  onClick={this.handleModal}
                  type="button"
                  className="btn btn-light btn-sm"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Buy;
