import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";

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

  useEffect(() => {
    Axios.get("http://localhost:3001/showpass", {
      params: { passcode: location.state },
    }).then((response) => {
      setPassList(response.data);
    });
  }, []);

  const decryptPass = (encryption) => {
    Axios.post("http://localhost:3001/decryptpass", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      navigate("/Pin", { state: { val: response.data, vl: a } });
    });
  };

  const loggout = () => {
    navigate("/Login");
  };

  console.log(passList);
  const AddPasswordModal = () => {
    setAddPasswordModal(true);
  };

  const onCancel = () => {
    setAddPasswordModal(false);
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
                  <button variant="outline-primary">
                    Copy Username to Clipboard
                  </button>
                </td>
                <td>
                  <button variant="outline-primary">
                    Copy Password to Clipboard
                  </button>
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
                  <button>Delete</button>
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
