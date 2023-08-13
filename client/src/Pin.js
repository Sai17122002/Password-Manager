import React from "react";
import "./Pin.css";
import pass from "./password.png";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import MainNavigation from "./shared/MainNavigation";

function Pin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pinval, SetPinval] = useState("");
  const [userList, setuserList] = useState([]);

  useEffect(() => {
    Axios.post(`${process.env.REACT_APP_BACKEND}/allusers`, {
      email: location.state.vl,
    }).then((response) => {
      setuserList(response.data);
      console.log(response.data);
    });
  }, []);

  const veri = () => {
    console.log(userList.data[0].Pin, pinval);
    if (userList.data[0].Pin == pinval) {
      navigate("/Passw", {
        state: [location.state.val, pinval, location.state.email],
      });
    } else {
      navigate("/Login");
    }
  };

  return (
    <>
      <MainNavigation />
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
          <button className="but verify-but" onClick={veri}>
            Verify
          </button>
        </div>
      </div>
    </>
  );
}

export default Pin;
