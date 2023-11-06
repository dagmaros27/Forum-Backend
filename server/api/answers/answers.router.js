const { postAnswer, getAnwsers } = require("./answers.controller");
const router = require("express").Router();

router.post("/add", postAnswer);
router.get("/", getAnwsers);

module.exports = router;
