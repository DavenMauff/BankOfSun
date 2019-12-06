import React, { Component } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import tree from "../images/tree.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavLink, BrowserRouter } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="#">
          <img src={tree} />
        </a>
        <NavLink to="/">
          <a className="navbar-brand text-muted">The Bank of Sun</a>
        </NavLink>
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
              <UncontrolledDropdown>
                <DropdownToggle className="dropdown-toggle">
                  Transact
                </DropdownToggle>
                <DropdownMenu right>
                  <NavLink to="/transfer">
                    <DropdownItem>Transfer</DropdownItem>
                  </NavLink>
                  <DropdownItem divider />
                  <NavLink to="/buy">
                    <DropdownItem>Buy</DropdownItem>
                  </NavLink>
                  <NavLink to="/pay">
                    <DropdownItem>Pay</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>

            <li className="nav-item dropdown">
              <UncontrolledDropdown>
                <DropdownToggle className="dropdown-toggle">
                  Apply
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Debit Account</DropdownItem>
                  <DropdownItem>Credit Account</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
            <li className="nav-item dropdown">
              <UncontrolledDropdown>
                <DropdownToggle className="dropdown-toggle">
                  Investments
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Current Investments</DropdownItem>
                  <DropdownItem>Invest</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Help</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
            <li className="nav-item dropdown">
              <UncontrolledDropdown>
                <DropdownToggle className="dropdown-toggle">
                  Account Management
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Update Personal Information</DropdownItem>
                  <DropdownItem>Change Daily Limits</DropdownItem>
                  <DropdownItem>Change Password</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Deactivate</DropdownItem>
                  <DropdownItem>Contact Us</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
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
};

export default Navigation;
