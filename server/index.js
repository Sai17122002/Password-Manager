const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./model/Shema");
const Pass = require("./model/Pass");
const { encrypt, decrypt } = require("./Encryption.js");
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/puttable", async (req, res) => {
  const { usname, passc, pinn } = req.body;
  const newUser = new User({ Username: usname, Password: passc, Pin: pinn });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/addpassword", async (req, res) => {
  const { password, title, passcode, username } = req.body;

  const hpass = encrypt(password);
  const newPass = new Pass({
    password: hpass.password,
    title: title,
    iv: hpass.iv,
    passcode: passcode,
    username: username,
  });

  try {
    const savedPass = await newPass.save();
    res.status(200).json(savedPass);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/showpass", async (req, res) => {
  let passcode = req.query["passcode"];
  try {
    const passes = await Pass.find({ passcode: passcode });
    res.status(200).json(passes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/userdet", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/decryptpass", (req, res) => {
  res.send(decrypt(req.body));
});

app.listen(PORT);
