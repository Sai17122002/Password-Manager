import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import MainNavigation from "./shared/MainNavigation";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";

import PassItem from "./PassItem.js";

function App() {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [addPasswordModal, setAddPasswordModal] = useState(false);

  const navigate = useNavigate();
  const addPassword = () => {
    console.log(localStorage.getItem("email"));
    console.log(localStorage.getItem("token"));
    Axios.post(`${process.env.REACT_APP_BACKEND}/addpassword`, {
      password: password,
      title: title,
      passcode: localStorage.getItem("email"),
      username: username,
      token: localStorage.getItem("token"),
    }).then(() => {
      window.location.reload(true);
    });
  };
  const [passList, setPassList] = useState([]);
  let a = location.state;

  useEffect(() => {
    if (location.state) {
      localStorage.setItem("email", location.state[0]);
      localStorage.setItem("token", location.state[1]);
    }

    Axios.post(`${process.env.REACT_APP_BACKEND}/showpass`, {
      email: localStorage.getItem("email"),
    }).then((response) => {
      setPassList(response.data);
    });
  }, [location.state]);

  const decryptPass = (encryption) => {
    Axios.post(`${process.env.REACT_APP_BACKEND}/decryptpass`, {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      navigate("/Pin", {
        state: { val: response.data, vl: a, email: location.state },
      });
    });
  };
  console.log(passList);
  const logout = () => {
    navigate("/Login");
  };

  const AddPasswordModal = () => {
    setAddPasswordModal(true);
  };

  const onCancel = () => {
    setAddPasswordModal(false);
  };

  const deleteHandler = (id) => {
    Axios.post(`${process.env.REACT_APP_BACKEND}/:id`, {
      id: id,
    }).then((response) => {
      console.log("deleted");
      window.location.reload(true);
    });
  };

  return (
    <div className="App">
      <MainNavigation logout={logout} />
      {addPasswordModal && (
        <Modal
          setTitle={setTitle}
          setUsername={setUsername}
          setPassword={setPassword}
          onCancel={onCancel}
          addPassword={addPassword}
        />
      )}
      <div style={{ textAlign: "center", height: "45px" }}>
        <button onClick={AddPasswordModal} className="addpassword-button">
          {" "}
          Add Password
        </button>
      </div>

      <div style={{ textAlign: "center", padding: "5px 0" }} className="pp1">
        Click below to view your Password
      </div>

      <div className="showPasswo">
        {passList.map((data) => (
          <PassItem
            data={data}
            deleteHandler={deleteHandler}
            decryptPass={decryptPass}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
