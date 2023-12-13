const crypto = require("crypto");
const User = require("../models/userModel")
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const { resetPassword } = require("../mail/resetPassword");
exports.resetPasswordToken = async (req, res) => {
    console.log("object")
    try {
      console.log(req.body)
      const email = req.body.email;
      console.log(email)
      if (!email) {
        return res.status(401).json({
          message: "invalid credentials",
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({
            message: "User not found",
          });
      }

      const token = crypto.randomBytes(20).toString("hex");
       const updatedDetails = await User.findOneAndUpdate(
         { email: email },
         {
           token: token,
           resetPasswordExpires: Date.now() + 3600000,
         },
         { new: true }
       );
       console.log("DETAILS", updatedDetails);

         const url = `http://localhost:5173/update-password/${token}`;
         //const url = `http://192.168.181.219:5173/update-password/${token}`;

          await mailSender(
            email,
            "Password Reset",
            resetPassword(user.firstName , user.email , url)
          );
          
         res.json({
           success: true,
           message:
             "Email Sent Successfully, Please Check Your Email to Continue Further",
         });
  } catch (error) {
      return res.json({
        error: error.message,
        success: false,
        message: `Some Error in Sending the Reset Message`,
      });
  }
};

exports.hello = (req, res) => {
  console.log("object")
  res.send("jhee")
}

exports.resetPassword = async (req, res) => {
  try {
    const { password, cPassword, token } = req.body;
    if (!password || !cPassword || !token) {
      return res.status(401).json({
        success: false,
        message: "fill ALL FILEDS"
      });
    }
    if (password !== cPassword) {
      return res.status(402).json({
        success: false,
        message: "Password not match",
      });
    }
    const user = await User.findOne({ token });
    if (!user) {
       return res.status(402).json({
         success: false,
         message: "User not found",
       });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
     
      { new: true }
    );
 await User.findOneAndUpdate(
   { token: token },
  
   { $set: { token: "" } },
  
 );
  return  res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    console.log(error)
  }
}