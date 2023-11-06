const pool = require("../../config/database");

module.exports = {
  addAnswer: (data, callback) => {
    const { answer, questionId, userId } = data;
    pool.query(
      "Insert into answer(answer, question_id, user_id) values(?, ?,?)",
      [answer, questionId, userId],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },

  getAnswers: (id, callback) => {
    pool.query(
      " SELECT answer.*, registration.user_name FROM answer JOIN registration ON answer.user_id = registration.user_id where answer.question_id = ?",
      [id],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },
};
