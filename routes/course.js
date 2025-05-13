const express = require("express");
const courseRouter = express.Router();

courseRouter.post("/purchase", (req, res) => {
  res.json({ msg: "purchase" });
});

courseRouter.post("/review", (req, res) => {
  res.json({ msg: "review" });
});

module.exports = {courseRouter};
