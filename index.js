const express = require("express");
const mongoose = require("mongoose");

const { CONNECT_STRING } = require("./config");

const app = express();
const port = 3000;

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

function main() {
  mongoose.connect(CONNECT_STRING);
  app.listen(port);
}
main();
