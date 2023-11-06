const pool = require("../../config/database");

module.exports = {
  addQuestion: (data, callback) => {
    const { title, description, userId, tags } = data;
    pool.query(
      "INSERT INTO question(question,question_description, tags, user_id) VALUES(?,?,?,?)",
      [title, description, tags, userId],

      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },

  allQuestions: (callback) => {
    pool.query(
      "SELECT question.*, registration.user_name FROM question JOIN registration ON question.user_id = registration.user_id;",
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },
  questionById: (id, callback) => {
    pool.query(
      "SELECT question_id,question, question_description,tags from question where question_id = ?",
      [id],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },
};
