const {
  questionById,
  addQuestion,
  allQuestions,
} = require("./questions.service");

module.exports = {
  postQuestion: (req, res) => {
    const { title, description, userId, tags } = req.body;
    if (!title) {
      return res.status(401).json({
        msg: "No title is provided for the question",
      });
    }
    if (title.length > 200) {
      return res.status(401).json({
        msg: "Question title is too long",
      });
    }
    addQuestion(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Database connection error",
        });
      }
      return res.status(200).json({
        msg: "question added successfully",
        data: result,
      });
    });
  },
  getAllQuestions: (req, res) => {
    allQuestions((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Database connection error",
        });
      }
      return res.status(200).json({
        questions: result,
      });
    });
  },
  getQuestionById: (req, res) => {
    const questionId = req.params.id;
    console.log(questionId);
    questionById(questionId, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Database connection error",
        });
      }
      return res.status(200).json({
        question: result,
      });
    });
  },
};
