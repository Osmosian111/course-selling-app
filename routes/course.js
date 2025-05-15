const express = require("express");

const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db");
const courseRouter = express.Router();

courseRouter.get("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.courseId;

  const course = await purchaseModel.findOne({
    courseId,
    userId,
  });

  if (!course) {
    purchaseModel.create({
      courseId,
      userId,
    });
  } else {
    res.send({
      msg: "You have already bought this course",
    });
  }

  res.json({ msg: "purchase" });
});

courseRouter.get("/preview", async (req, res) => {
  const courses = await courseModel.find({});
  res.json({ courses });
});

module.exports = { courseRouter };
