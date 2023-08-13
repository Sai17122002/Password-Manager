import React from "react";
import "./PassItem.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

function PassItem(props) {
  const deleteHandler = () => {
    props.deleteHandler(props.data._id);
  };

  const decryptPass = () => {
    props.decryptPass({
      password: props.data.password,
      iv: props.data.iv,
      id: props.data.id,
    });
  };
  return (
    <div className="passitem-wrapper">
      <p className="title">{props.data.title}</p>
      <div className="parent-passitem">
        <p className="to-left">{props.data.username}</p>
        <CopyToClipboard text={props.data.username}>
          <button className="passitem-password-button">
            Copy To Clipboard
          </button>
        </CopyToClipboard>

        <p className="to-left passitem-password">*****</p>
        <button className="passitem-password-button" onClick={decryptPass}>
          View Password
        </button>
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button className="delete-password-button" onClick={deleteHandler}>
          Delete
        </button>
        <p style={{ color: "red" }}>Can't be recovered once deleted!!</p>
      </div>
    </div>
  );
}

export default PassItem;
