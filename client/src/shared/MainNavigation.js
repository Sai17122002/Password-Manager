import React from "react";
import pass from "../password.png";
import "./MainNavigation.css";
import { NavLink } from "react-router-dom";

function MainNavigation(props) {
  const logout = () => {
    props.logout();
  };
  return (
    <nav className="navigation-wrapper">
      <div className="navigation-left">
        <img src={pass} alt="password" />
        <NavLink to="/App">Home</NavLink>
        <NavLink>About Us</NavLink>
      </div>
      <div className="navigation-right">
        <button onClick={logout}>Sign Out</button>
      </div>
    </nav>
  );
}

export default MainNavigation;
