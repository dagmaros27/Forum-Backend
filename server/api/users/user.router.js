const router = require("express").Router();
const { createUser, getUserById, login } = require("./user.controller");
const auth = require("../middleware/auth");
router.post("/add", createUser);
router.get("/", auth, getUserById);
router.post("/login", login);
module.exports = router;
