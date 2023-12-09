const express = require("express");
const { signUp, login, getUser, about, logout } = require("../controllers/auth");
const {auth} = require("../middleware/auth")
const router = express.Router();

router.post("/createUser", signUp);
router.post("/login", login);
router.get("/getUser/",auth, getUser);
router.get("/about", auth, about);
router.get("/logout" ,auth, logout)
module.exports = router;