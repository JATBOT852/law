import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class="navbar">
      <div class="logo">
        <Link to="/" id="logo-name">
          Legal<span> Advisor</span>
        </Link>
      </div>
      <div class="about">
        <Link to="/About">About</Link>
      </div>
    </div>
  );
};

export default Navbar;
