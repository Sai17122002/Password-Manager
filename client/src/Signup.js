import React from "react";
import pass from "./password.png";
import { NavLink } from "react-router-dom";
import "./Signup.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { TypeAnimation } from "react-type-animation";

function Signup() {
  const [usname, Setusname] = useState("");
  const [passc, Setpassc] = useState("");
  const [pinn, Setpinn] = useState("");

  const putdata = () => {
    Axios.post("http://localhost:3001/puttable", {
      usname: usname,
      passc: passc,
      pinn: pinn,
    }).then(() => {});
  };

  return (
    <div className="outer-login" style={{ margin: "40px" }}>
      <div className="outer-login-text">
        <p style={{ margin: "0" }}>
          <img src={pass} />
          <p>Password Manager</p>
        </p>
        <TypeAnimation
          sequence={[
            "We Store Passwords !!",
            1000,
            "We Manage Passwords !!",
            2000,
            "We Encrypt Passwords !!",
            () => {},
          ]}
          wrapper="div"
          cursor={true}
          repeat={Infinity}
          style={{
            fontSize: "2em",
            fontWeight: "10",
            color: "black",
          }}
        />
      </div>
      <div className="inner-login">
        <div className="login-nam nam112">SIGN UP</div>
        <div className="nam111">
          Already have an account?{" "}
          <NavLink
            to="/Login"
            style={{
              color: "#674fa2",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Click here
          </NavLink>
        </div>
        <div className="login-email">
          <p>Username</p>
          <input
            style={{ margin: "0" }}
            type="text"
            className="uname1"
            // placeholder="Enter Username"
            onChange={(event) => {
              Setusname(event.target.value);
            }}
          />
        </div>
        <div className="login-password">
          <p>Password</p>
          <input
            style={{ margin: "0" }}
            type="password"
            className="pass1"
            // placeholder="Enter Password"
            onChange={(event) => {
              Setpassc(event.target.value);
            }}
          />
        </div>
        <div className="login-email">
          <p>Pin</p>
          <input
            type="text"
            className="pin11"
            // placeholder="Enter Pin"
            style={{ margin: "0" }}
            onChange={(event) => {
              Setpinn(event.target.value);
            }}
          />
        </div>
        <div className="button-wrapper">
          <NavLink to="/Login">
            <button
              className="but1 login-but"
              onClick={putdata}
              style={{ transform: "translateX(22px)" }}
            >
              SignUp
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Signup;
