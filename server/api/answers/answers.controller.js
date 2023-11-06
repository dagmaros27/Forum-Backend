const { addAnswer, getAnswers } = require("./answers.service");

module.exports = {
  postAnswer: (req, res) => {
    if (!req.body.answer) {
      return res.status(401).json({
        msg: "No answer is provided",
      });
    }
    addAnswer(req.body, (err, result) => {
      if (err) {
        return res.status(500).json({
          msg: "Database connection error",
        });
      }
      return res.status(200).json({
        msg: "answer added successfully",
        data: result,
      });
    });
  },

  getAnwsers: (req, res) => {
    const questionId = req.query.questionId;
    getAnswers(questionId, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Database connection error22",
        });
      }
      return res.status(200).json({
        answers: result,
      });
    });
  },
};
