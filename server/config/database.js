const mysql = require("mysql2");

const registration = `CREATE TABLE IF NOT EXISTS registration(
    user_id int auto_increment,
    user_name varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    primary key (user_id)
)`;

const profile = `CREATE TABLE IF NOT EXISTS profile(
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    primary key (user_profile_id),
    foreign key (user_id) references registration(user_id)
)`;

const question = `CREATE TABLE IF NOT EXISTS question(
    question_id int auto_increment,
    question varchar(255) NOT NULL,
    question_description varchar(255),
    question_code_block varchar(255),
    tags varchar(255),
    post_id int NOT NULL,
    user_id int NOT NULL,
    primary key (question_id),
    unique key (post_id),
    foreign key (user_id) references registration(user_id)
)`;

const answer = `CREATE TABLE IF NOT EXISTS answer(
    answer_id int auto_increment,
    answer varchar(255) NOT NULL,
    answer_code_block varchar(255),
    question_id int NOT NULL,
    user_id int NOT NULL,
    primary key (answer_id),
    foreign key (user_id) references registration(user_id),
    foreign key (question_id) references question(question_id)
)`;

const pool = mysql.createPool({
  connectTimeout: 60000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
});

pool.getConnection((err, conn) => {
  console.log("connected");
});

pool.query(registration, function (err, result) {
  if (err) throw err;
  console.log("registration table created");
});
pool.query(profile, function (err, result) {
  if (err) throw err;
  console.log("profile table created");
});

pool.query(question, function (err, result) {
  if (err) throw err;
  console.log("question table created");
});

pool.query(answer, function (err, result) {
  if (err) throw err;
  console.log("answer table created");
});

module.exports = pool;
