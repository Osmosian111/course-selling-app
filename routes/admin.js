const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");

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
