const express = require("express");
const app = express();
const port = 3000;

const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");

app.use(express.json());
app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(port);
