import React, { useContext } from "react";
import pass from "./password.png";
import "./Login.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "./Util/validators";
import Input from "./shared/Input";
import { TypeAnimation } from "react-type-animation";

function Login() {
  const navigate = useNavigate();
  const [usname, Setusname] = useState("");
  const [passname, Setpassname] = useState("");
  const [unameIsValid, setUnameIsValid] = useState(false);
  const [passIsValid, setPassIsValid] = useState(false);

  const putdata = () => {
    console.log(usname, passname);
    Axios.post("http://localhost:3001/userdet", {
      email: usname,
      password: passname,
    })
      .then(() => {
        navigate("/App",{state: usname});
      })
      .catch((err) => {
        navigate("/Login");
      });
  };
  const InputHandler = (data) => {
    if (data) {
      setUnameIsValid(data.isValid);
      Setusname(data.value);
    }
  };
  const PasswordInputHandler = (data) => {
    if (data) {
      Setpassname(data.value);
      setPassIsValid(data.isValid);
    }
  };
  let dis = "";
  if (unameIsValid && passIsValid) {
    dis = "";
  } else dis = "not-allowed";
  return (
    <div className="outer-login">
      <div className="outer-login-text">
        <p>
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
        <div className="login-nam">LOG IN</div>

        <div className="login-email">
          <p>Email</p>
          <Input
            onInput={InputHandler}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Enter a valid email"
          />
        </div>
        <div className="login-password">
          <p>Password</p>
          <Input
            onInput={PasswordInputHandler}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Enter a valid password"
          />
        </div>
        <div className="button-wrapper">
          <button
            style={{
              marginLeft: "0",
              cursor: dis,
            }}
            className="login-but"
            onClick={putdata}
          >
            LOGIN
          </button>
        </div>
        <div className="login-nam1">
          Don't have an account?{" "}
          <NavLink
            to="/Signup"
            style={{
              color: "#674fa2",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Click here
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
