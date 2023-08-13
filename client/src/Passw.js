import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Passw.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MainNavigation from "./shared/MainNavigation";

function Passw() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);
  let ans = location.state;
  console.log(location.state);
  const fun3 = () => {
    navigate("/App", { state: location.state[2] });
  };

  return (
    <>
      <MainNavigation />
      <div className="out1">
        <div className="in1">Your Password is <span>{ans[0]}</span></div>
        <div className="passw-wrapper">
          <button className="b1t login-but" onClick={fun3}>
            Go back
          </button>
          <CopyToClipboard text={ans[0]}>
            <button className="b1t login-but">Copy Password</button>
          </CopyToClipboard>
        </div>
      </div>
    </>
  );
}

export default Passw;
