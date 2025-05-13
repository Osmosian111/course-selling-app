const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  res.json({ msg: "signup" });
});

userRouter.post("/signin", (req, res) => {
  res.json({ msg: "signin" });
});

userRouter.post("/purchases", (req, res) => {
  res.json({ msg: "purchases" });
});

module.exports = {userRouter};
