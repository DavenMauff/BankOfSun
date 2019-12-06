import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Navigation from "./Navigation";
import Buy from "./Buy";
import Pay from "./Pay";
import Transfer from "./Transfer";
import axios from "axios";
import jsSHA from "jssha";
import debit from "../images/debit.png";
import Modal from "react-responsive-modal";
import * as firebase from "firebase";
import Login from "../login";

class Accounts extends Component {
  constructor(params) {
    super(params);
    this.state = {
      accounts: [],
      clientName: [],
      clientAccounts: [],
      clientTransactionsS: [],
      clientTransactionsC: [],
      clientTransactionsCr: [],
      selectedTransaction: [],
      matchedAccount: "",
      open: false,
      trans: [],
      accs: [],
      change: []
    };

    this.handleModal = this.handleModal.bind(this);
    this.handletransactions = this.handletransactions.bind(this);
    this.APIcall = this.APIcall.bind(this);
    this.APIcall();
  }

  componentDidMount() {
    firebase
      .database()
      .ref("user/")
      .once("value", snap => {
        console.log(snap.val());
        console.log("hello");
      });
    firebase
      .database()
      .ref("user/9601295105080")
      .set({ Name: "Daven" });

    firebase
      .database()
      .ref("user/")
      .push({ Name: "Jacques" });
  }
  handletransactions(userAccountType) {
    console.log(userAccountType);
    if (userAccountType === "savings") {
      this.setState({ selectedTransaction: this.state.clientTransactionsS });
      this.setState({ open: !this.state.open });
    }
    if (userAccountType === "cheque") {
      this.setState({ selectedTransaction: this.state.clientTransactionsC });
      this.setState({ open: !this.state.open });
    }
    if (userAccountType === "credit") {
      this.setState({ selectedTransaction: this.state.clientTransactionsCr });
      this.setState({ open: !this.state.open });
    }
  }

  handleModal() {
    this.setState({ open: !this.state.open });
  }

  APIcall() {
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
      firebase
        .database()
        .ref("user/" + res.data[0]._id)
        .child("Ben")
        .once("value", snap => {
          console.log(snap.val());
          const arr = [];
          snap.forEach(bensnap => {
            arr.push(bensnap.val());
            console.log(bensnap.val());
          });
          console.log(arr);
        });

      firebase
        .database()
        .ref("user/" + res.data[0]._id)
        .child("Ben")
        .push({
          Name: "Jacques",
          AccountNum: "872672uemb"
        });
      //const client = await api.get();
      //const client = await api.get(`/${res.data[0]._id}`);
      const accounts = await api.get(`/accounts/${res.data[0]._id}`);
      this.setState({ clientAccounts: accounts.data });
      await accounts.data.map(async x => {
        console.log(accounts.data);
        if (x.type === "savings") {
          const transact = await api.get(`/transactions/${x._id}/.*`);
          this.setState({ clientTransactionsS: transact.data });
          // const body = {
          //   type: "Purchase",
          //   src: "8fda668f-5480-3d2a-86d3-baec6fa21f39",
          //   dest: "9f0656ce-8910-407b-9a21-fe508b487968",
          //   amount: 10,
          //   ref: "Payment to Daven"
          // };
          // await api.post(`/transactions`, body);
          // const body2 = {
          //   type: "Purchase",
          //   src: "4fad6186-ef28-37c4-8211-4900b51c628d",
          //   dest: "9f0656ce-8910-407b-9a21-fe508b487968",
          //   amount: 10 * -1,
          //   ref: "Payment to Daven"
          // };
          // await api.post(`/transactions`, body2);

          const body2 = {
            type: "Purchase",
            src: "4fad6186-ef28-37c4-8211-4900b51c628d",
            dest: "9f0656ce-8910-407b-9a21-fe508b487968",
            amount: 10 * -1,
            ref: "Payment to Daven"
          };
          console.log(await api.post(`/generic/`, body2));
          console.log(
            await api.get(`/generic/847fea68-0f81-3ad8-b8cc-5a745d0e8b83`)
          );
        }
        if (x.type === "cheque") {
          const transact = await api.get(`/transactions/${x._id}/.*`);
          this.setState({ clientTransactionsC: transact.data });
        }
        if (x.type === "credit") {
          const transact = await api.get(`/transactions/${x._id}/.*`);
          this.setState({ clientTransactionsCr: transact.data });
        }
      });

      // this.setState({ accs: accounts.data._id });
      // this.setState({ change: accounts.data.type });
      // this.setState({ clientName: client.data });
      this.setState({ clientName: res.data[0].first });
      // this.setState({ clientAccountType: accounts.type });
      this.setState({
        clientName:
          this.state.clientName.charAt(0).toUpperCase() +
          this.state.clientName.slice(1)
      });

      //console.log(transact.data);
      console.log(accounts.data);
      console.log(accounts.data[0].type);
      //console.log(client);
      console.log("Chris is small");
    })();
  }
  // matchAccounts(x) {
  //  for (var i = 0; i < this.state.clientTransactions.length; i++) {
  //  if (this.state.trans[x] === this.state.accs[i]) {
  //   this.setState({ matchedAccount: this.change[x] });
  //  break;
  // }
  //}
  //}

  render() {
    const { open } = this.state;
    const padding = 90; // adjust this to your needs
    let height = this.state.contentHeight + padding;
    let heightPx = height + "px";
    let heightOffset = height / 2;
    let offsetPx = heightOffset + "px";
    const style = {
      content: {
        border: "0",
        borderRadius: "4px",
        bottom: "auto",
        height: heightPx, // set height
        left: "50%",
        padding: "2rem",
        position: "fixed",
        right: "auto",
        top: "50%", // start from center
        transform: "translate(-50%,-" + offsetPx + ")", // adjust top "up" based on height
        width: "40%",
        maxWidth: "40rem"
      }
    };
    return (
      <div>
        <Modal style={style} open={open} onClose={this.handleModal}>
          <table>
            <tr>
              <th>Type</th>
              <th>Amount Transferred</th>
              <th>Balance</th>
            </tr>
            {this.state.selectedTransaction.map(x => (
              <tr>
                <td key={x._id}>{`${x.type}`}</td>
                <td key={x._id}>{`${x.amount * -1}`}</td>
                <td key={x._id}>{`${x.balance}`}</td>
              </tr>
            ))}
          </table>
          <button className="btn modal-button" onClick={this.handleModal}>
            Done
          </button>
        </Modal>
        <div className="index6">
          <div class="container pt-5">
            <h1 className="text-light">
              {this.state.clientName}
              's Account
            </h1>
            <div class="row">
              {this.state.clientAccounts.map(x => (
                <div class="col-lg-4 col-sm-12">
                  <div className="jumbotron">
                    <img src={debit} />
                    <div class="pt-3">
                      <p key={x._id}>
                        {`${x.type}`.charAt(0).toUpperCase() +
                          `${x.type}`.slice(1)}{" "}
                        Account
                      </p>

                      <p key={x._id}>R{`${x.balance}` / 100}</p>
                    </div>
                    <button onClick={e => this.handletransactions(x.type)}>
                      View Transaction History
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Accounts;
