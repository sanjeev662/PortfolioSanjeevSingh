import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import logo from "../Assets/Images/logo.png";

function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt=""
            width="40"
            height="40"
            className="d-inline-block"
          />
          &nbsp;&nbsp;Sanjeev Singh
        </Link>

        {/* for responsive button  */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div
          className="collapse navbar-collapse text-center"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ms-auto ">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About Me</Link>
            <Link to="/domain" className="nav-link">Domain</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/certificates" className="nav-link">Certificate</Link>
            {/* <Link to="/skills" className="nav-link">Skills</Link> */}
            <Link to="/contacts" className="nav-link">Contact Me</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
