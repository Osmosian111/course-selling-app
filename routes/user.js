const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "IAmLazyUser";

const { userMiddleware } = require("../middleware/user");
const { userModel } = require("../db");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
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

  await userModel
    .create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    })
    .then(() => res.json({ msg: "signup" }))
    .catch(() => res.json({ msg: "Email already exist" }));
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await userModel.findOne({ email });

    const passwordMatch = bcrypt.compare(password, response.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: response._id }, JWT_SECRET);
      res.json({
        msg: token,
      });
    }
  } catch (error) {
    res.json({
      msg: "Invalid Credential",
    });
  }
});

userRouter.get("/purchases", (req, res) => {
  res.json({ msg: "purchases" });
});

module.exports = { userRouter };
