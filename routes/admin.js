const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_ADMIN_PASSWORD } = require("../config");

const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");
const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const requiredBody = zod.object({
    email: zod.string().max(50).email(),
    password: zod.string().min(8).max(50),
    firstName: zod.string(),
    lastName: zod.string(),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      msg: parsedDataWithSuccess.error,
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 5).catch(() => {
    req.json({
      msg: "Try again",
    });
    return;
  });

  await adminModel
    .create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    })
    .then(() => res.json({ msg: "signup" }))
    .catch(() => res.json({ msg: "Email already exist" }));
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await adminModel.findOne({ email });
    const passwordMatch = bcrypt.compare(password, response.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: response._id }, JWT_ADMIN_PASSWORD);
      res.json({
        msg: token,
      });
    } else {
      res.json({
        msg: "Invalid credential",
      });
    }
  } catch (error) {
    res.json({
      msg: "Invalid credential",
      error,
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  try {
    const course = await courseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId,
    });

    res.json({
      msg: "Course created",
      courseId: course._id,
    });
  } catch (error) {
    res.json({
      msg: "SomeThing is wrong",
    });
  }
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const { title, description, price, imageUrl, courseId } = req.body;

  try {
    const course = await courseModel.findOneAndUpdate(
      {
        _id: courseId,
        creatorId: adminId,
      },
      { title, description, price, imageUrl }
    );
    res.json({ msg: "Updated course" });
  } catch (error) {
    console.log(error);
    res.json({
      msg: "You are not owner of that course or course does not exist",
    });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  try {
    const course = await courseModel.find({
      creatorId: adminId,
    });
    res.json({
      course
    })
  } catch (error) {
    res.json({ msg: "Error" });
  }

});

module.exports = { adminRouter };
