const express = require("express");
const adminRouter = express.Router();

adminRouter.post("/signup", (req, res) => {
  res.json({ msg: "signup" });
});

adminRouter.post("/signin", (req, res) => {
  res.json({ msg: "signin" });
});

adminRouter.post("/course", (req, res) => {
  res.json({ msg: "course" });
});

adminRouter.get("/courses", (req, res) => {
  res.json({ msg: "course" });
});

adminRouter.put("/course", (req, res) => {
  res.json({ msg: "course" });
});

module.exports = { adminRouter };
