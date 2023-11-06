require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./server/config/database.js");

const userRouter = require("./server/api/users/user.router.js");
const questionRouter = require("./server/api/questions/questions.router");
const answerRouter = require("./server/api/answers/answers.router");
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "hello world",
  });
});
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

app.listen(port, (req, res) => {
  console.log("listening on port: " + port);
});
