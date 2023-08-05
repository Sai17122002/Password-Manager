import React from "react";
import pass from "./password.png";
import { NavLink } from "react-router-dom";
import "./Signup.css";
import { useState, useEffect } from "react";
  import Axios from "axios";
import { TypeAnimation } from "react-type-animation";
import Input from "./shared/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./Util/validators";

function Signup() {
  const [usname, Setusname] = useState("");
  const [passc, Setpassc] = useState("");
  const [pinn, Setpin] = useState("");
  const [unameIsValid, setUnameIsValid] = useState(false);
  const [passIsValid, setPassIsValid] = useState(false);
  const [pinIsValid, setPinIsValid] = useState(false);
  const putdata = () => {
    Axios.post("http://localhost:3001/puttable", {
      usname: usname,
      passc: passc,
      pinn: pinn,
    }).then(() => {});
  };

  const emailInputHandler = (data) => {
    Setusname(data.value);
    setUnameIsValid(data.isValid);
  };

  const passInputHandler = (data) => {
    Setpassc(data.value);
    setPassIsValid(data.isValid);
  };

  const pinInputHandler = (data) => {
    Setpin(data.value);
    setPinIsValid(data.isValid);
  };

  let dis;
  if (unameIsValid && passIsValid && pinIsValid) {
    dis = "";
  } else dis = "not-allowed";

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
          <p>Email</p>
          <Input
            onInput={emailInputHandler}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Enter a valid email"
          />
        </div>
        <div className="login-password">
          <p>Password</p>
          <Input
            onInput={passInputHandler}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Enter a valid password"
            type="password"
          />
        </div>
        <div className="login-email">
          <p>Pin</p>
          <Input
            onInput={pinInputHandler}
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText="Enter a valid Pin"
          />
        </div>
        <div className="button-wrapper">
          <NavLink to="/Login">
            <button
              className="but1 login-but"
              onClick={putdata}
              style={{ paddingLeft: "20", cursor: dis }}
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
