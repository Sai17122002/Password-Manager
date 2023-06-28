import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
  const content = (
    <div className="Addpass modal">
      <div>Enter Website and password</div>
      <input
        type="text"
        placeholder="Website"
        onChange={(event) => {
          props.setTitle(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          props.setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(event) => {
          props.setPassword(event.target.value);
        }}
      />
      <button className="login-but" onClick={props.addPassword}>
        {" "}
        Add Password
      </button>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      <Backdrop onClick={props.onCancel} />
      <ModalOverlay {...props} />
    </>
  );
};
export default Modal;
