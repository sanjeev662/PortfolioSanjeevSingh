import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";
import logo from "../Assets/Images/logo.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar fixed-top navbar-expand-md navbar-light ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <img
            src={logo}
            alt="Sanjeev Singh"
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
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div
          className="collapse navbar-collapse text-center"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ms-auto ">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              About Me
            </Link>
            <Link 
              to="/domain" 
              className={`nav-link ${isActive('/domain') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Domain
            </Link>
            <Link 
              to="/projects" 
              className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Projects
            </Link>
            <Link 
              to="/certificates" 
              className={`nav-link ${isActive('/certificates') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Certificates
            </Link>
            {/* <Link to="/skills" className="nav-link">Skills</Link> */}
            <Link 
              to="/contacts" 
              className={`nav-link ${isActive('/contacts') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
