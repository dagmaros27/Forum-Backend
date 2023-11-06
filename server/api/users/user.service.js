const pool = require("../../config/database");

module.exports = {
  register: (data, callback) => {
    pool.query(
      "INSERT INTO registration(user_name, user_email, user_password) VALUES(?,?,?)",
      [data.userName, data.email, data.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }

        return callback(null, result);
      }
    );
  },

  profile: (data, callback) => {
    pool.query(
      "INSERT INTO profile(user_id, first_name, last_name) VALUES(?,?,?)",
      [data.userId, data.firstName, data.lastName],
      (err, result) => {
        if (err) {
          return callback(err);
        }

        return callback(null, result);
      }
    );
  },

  userById: (id, callback) => {
    pool.query(
      "Select registration.user_id,user_email,user_name,first_name,last_name from registration left join profile on registration.user_id = profile.user_id where registration.user_id = ?",
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }

        return callback(null, result[0]);
      }
    );
  },

  getUserByEmail: (email, callback) => {
    pool.query(
      "Select * from registration where user_email = ?",
      [email],
      (err, result) => {
        if (err) {
          return callback(err);
        }

        return callback(null, result[0]);
      }
    );
  },
};
