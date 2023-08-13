import React from "react";
import pass from "../password.png";
import { TypeAnimation } from "react-type-animation";

function MainPageDesign() {
  return (
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
  );
}

export default MainPageDesign;
