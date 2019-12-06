import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import tree from "./images/tree.png";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  render() {
    return (
      <div className="index6">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="#">
            <img src={tree} />
          </a>
          <a className="navbar-brand text-muted">The Bank of Sun</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={this.showDropdownMenu}
                >
                  Transact
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Buy
                  </a>
                  <a className="dropdown-item" href="#">
                    Transfer
                  </a>
                  <a className="dropdown-item" href="#">
                    Pay
                  </a>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Apply
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Debit Account
                  </a>
                  <a className="dropdown-item" href="#">
                    Credit Account
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Investments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Account Management
                </a>
              </li>
            </ul>
            <a type="button" className="btn btn-outline-danger button bankbtn">
              Switch to Business
            </a>
            <a
              className="btn btn-outline-success my-2 my-sm-0 button businessbtn"
              type="submit"
            >
              Logout
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Home;
