import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Passw.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
    <div className="out1">
      <div className="in1">Your Password is {ans[0]}</div>
      <div>
        <button className="b1t login-but" onClick={fun3}>
          Go back
        </button>
        <CopyToClipboard text={ans}>
          <button className="b1t login-but">Copy Password</button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default Passw;
