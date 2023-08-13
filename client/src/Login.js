import React from "react";
import "./Login.css";
import { useState } from "react";
import Axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "./Util/validators";
import Input from "./shared/Input";
import MainPageDesign from "./shared/MainPageDesign";

function Login() {
  const navigate = useNavigate();
  const [usname, Setusname] = useState("aaaa@gmail.com");
  const [passname, Setpassname] = useState("aaaaaa");
  const [unameIsValid, setUnameIsValid] = useState(false);
  const [passIsValid, setPassIsValid] = useState(false);

  const putdata = () => {
    console.log(process.env.REACT_APP_BACKEND);
    Axios.post(`${process.env.REACT_APP_BACKEND}/userdet`, {
      email: usname,
      password: passname,
    })
      .then((res) => {
        console.log(res.data.token);
        navigate("/App", { state: [usname, res.data.token] });
      })
      .catch((err) => {
        navigate("/");
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
      <MainPageDesign />
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
            type="password"
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
