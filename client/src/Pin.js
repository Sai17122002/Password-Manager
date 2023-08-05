import React from "react";
import "./Pin.css";
import pass from "./password.png";
import { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Axios from "axios";

function Pin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pinval, SetPinval] = useState("");
  const [userList, setuserList] = useState([]);

  let usname = "";
  useEffect(() => {
    Axios.post("http://localhost:3001/allusers", {
      email: location.state.vl,
    }).then((response) => {
      setuserList(response.data);
      console.log(response.data);
    });
  }, []);
  console.log(location.state);
  const veri = () => {
    console.log(userList.data[0].Pin, pinval);
    if (userList.data[0].Pin == pinval) {
      // console.log("Success");
      // console.log(location.state);
      navigate("/Passw",{state: [location.state.val,pinval,location.state.email]});
    }
    // } else {
    //   navigate("/Login");
    // }
  };

  return (
    <div className="outer-pin">
      <div className="inner-pin">
        <div className="upper-pin">
          <img src={pass} />
          <div className="up"> Pass-Man </div>
        </div>
        <div className="nam">PIN</div>
        <input
          type="text"
          className="pinclass"
          placeholder="Enter the pin"
          onChange={(event) => {
            SetPinval(event.target.value);
          }}
        />
        <button className="but" onClick={veri}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default Pin;
