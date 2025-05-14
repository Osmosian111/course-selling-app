const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "IAmLazyAdmin";

const { adminModel } = require("../db");
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

    if (passwordMatch) {
      const token = jwt.sign({ id: response._id }, JWT_SECRET);
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
    });
  }

  const passwordMatch = bcrypt.compare(password, response.password);
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
