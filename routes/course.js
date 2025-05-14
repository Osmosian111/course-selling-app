const express = require("express");

const courseModel = require("../db");
const courseRouter = express.Router();

courseRouter.get("/purchase", (req, res) => {
  res.json({ msg: "purchase" });
});

courseRouter.get("/preview", (req, res) => {
  res.json({ msg: "preview" });
});

module.exports = { courseRouter };
