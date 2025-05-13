const express = require("express");
const courseRouter = express.Router();

courseRouter.get("/purchase", (req, res) => {
  res.json({ msg: "purchase" });
});

courseRouter.get("/preview", (req, res) => {
  res.json({ msg: "review" });
});

module.exports = { courseRouter };
