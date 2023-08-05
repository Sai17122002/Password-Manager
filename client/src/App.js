import "./App.css";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [addPasswordModal, setAddPasswordModal] = useState(false);
  const navigate = useNavigate();
  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
      passcode: location.state,
      username: username,
    }).then(() => {
      window.location.reload(true);
    });
  };

  const [passList, setPassList] = useState([]);
  let a = location.state;
  console.log(location.state);
  useEffect(() => {
    Axios.post("http://localhost:3001/showpass", {
      email: location.state,
    }).then((response) => {
      console.log(response.data);
      setPassList(response.data);
    });
  }, [location.state.usname]);
  console.log(passList);
  const decryptPass = (encryption) => {
    Axios.post("http://localhost:3001/decryptpass", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      console.log(response);
      navigate("/Pin", {
        state: { val: response.data, vl: a, email: location.state },
      });
    });
  };

  const loggout = () => {
    navigate("/Login");
  };

  const AddPasswordModal = () => {
    setAddPasswordModal(true);
  };

  const onCancel = () => {
    setAddPasswordModal(false);
  };

  const deleteHandler = (id) => {
    Axios.post("http://localhost:3001/:id", {
      id: id,
    }).then((response) => {
      console.log("deleted");
      window.location.reload(true);
    });
  };

  return (
    <div className="App">
      {addPasswordModal && (
        <Modal
          setTitle={setTitle}
          setUsername={setUsername}
          setPassword={setPassword}
          onCancel={onCancel}
          addPassword={addPassword}
        />
      )}
      <button onClick={AddPasswordModal} className="addpassword-button">
        {" "}
        Add Password
      </button>

      <div className="pp1">Click below to view your Password</div>

      <div className="showPasswo">
        <table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Username</th>
              <th>Password</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {passList.map((c) => (
              <tr key={c.id}>
                <td>{c.username}</td>
                <td>www.google.com</td>
                <td>{c.username}</td>
                <td>******</td>
                <td>
                  <CopyToClipboard text={c.username}>
                    <button variant="outline-primary">
                      Copy Username to Clipboard
                    </button>
                  </CopyToClipboard>
                </td>

                <td>
                  <button
                    onClick={() => {
                      decryptPass({
                        password: c.password,
                        iv: c.iv,
                        id: c.id,
                      });
                    }}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteHandler(c._id);
                    }}
                    variant="outline-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
