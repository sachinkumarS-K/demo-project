const express = require("express");
const { signUp, login, getUser, about, logout } = require("../controllers/auth");
const { resetPasswordToken, hello, resetPassword } = require("../controllers/resetPassword");
const {auth} = require("../middleware/auth")
const router = express.Router();

router.post("/createUser", signUp);
router.post("/login", login);
router.get("/getUser/",auth, getUser);
router.get("/about", auth, about);
router.get("/logout", auth, logout);
router.get("/hello" , hello)
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword" , resetPassword);

module.exports = router;