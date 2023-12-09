const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token 
     
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Issue in token",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "something went wrong",
    });
  }
};
