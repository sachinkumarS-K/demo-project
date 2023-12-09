const express = require("express");
const { createTodo } = require("../controllers/todo");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/createTodo",auth, createTodo);

module.exports = router;
