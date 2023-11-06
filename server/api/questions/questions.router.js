const {
  postQuestion,
  getAllQuestions,
  getQuestionById,
} = require("./questions.controller");
const router = require("express").Router();

router.post("/add", postQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

module.exports = router;
