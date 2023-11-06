const {
  register,
  getUserByEmail,
  profile,
  userById,
} = require("./user.service");
const bcrypt = require("bcryptjs");
const pool = require("../../config/database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  createUser: (req, res) => {
    const { userName, password, email, firstName, lastName } = req.body;
    if (!userName || !password || !email || !firstName || !lastName) {
      return res.status(400).json({
        msg: "Not all fields has been provided",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        msg: "Password too short, must be at least 8 characters",
      });
    }
    pool.query(
      "Select * from registration where user_email = ?",
      [email],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            msg: "Database connection error",
          });
        }
        if (result.length > 0) {
          return res.status(400).json({
            msg: "An account with this email already exists",
          });
        } else {
          const salt = bcrypt.genSaltSync(10);
          req.body.password = bcrypt.hashSync(password, salt);
          register(req.body, (err, result) => {
            if (err) {
              return res.status(500).json({
                msg: "Database connection error1",
              });
            }
            pool.query(
              `SELECT * FROM registration where user_email = ?`,
              [email],
              (err, result) => {
                if (err) {
                  return res.status(500).json({
                    msg: "Database connection error3",
                  });
                }
                req.body.userId = result[0].user_id;
                console.log(req.body);

                profile(req.body, (err, result) => {
                  if (err) {
                    return res.status(500).json({
                      msg: "Database connection error2",
                    });
                  }
                  return res.status(200).json({
                    msg: "user added successfully",
                    data: result,
                  });
                });
              }
            );
          });
        }
      }
    );
  },
  getUserById: (req, res) => {
    userById(req.id, (err, result) => {
      if (err) {
        return res.status(500).json({
          msg: "Database connection error",
        });
      }
      if (!result) {
        return res.status(404).json({
          msg: "No user found",
        });
      } else {
        return res.status(200).json({
          data: result,
        });
      }
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        msg: "Not all fields have been provided",
      });
    }
    getUserByEmail(email, (err, result) => {
      if (err) {
        return res.status(500).json({
          msg: "Database connection error",
        });
      }
      if (!result) {
        return res.status(404).json({
          msg: "No user with this email has been registered",
        });
      } else {
        const isMatch = bcrypt.compareSync(password, result.user_password);
        if (!isMatch) {
          return res.status(404).json({
            msg: "Invalid credentials",
          });
        }
        const token = jwt.sign({ id: result.user_id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          token,
          user: {
            id: result.user_id,
            display_name: result.user_name,
          },
        });
      }
    });
  },
};
