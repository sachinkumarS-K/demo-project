const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
  
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body)
        if (!firstName || !lastName || !email || !password) {
          return res.status(500).json({
            sucess: false,
            message: "all fields are required",
          });
        }
        const checkUser = await User.findOne({ email });
        if (checkUser) {
          return res.status(500).json({
            sucess: false,
            message: "User already registered",
          });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user =  User.create({
          firstName,
          lastName,
          email,
          password : hashedPassword,
          image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });
   
        return res.status(200).json({
          success: true,
          message: "User registerd successfully",
          data: user,
        });
    } catch (error) {
        return res.status(500).json({
          sucess: false,
          message: "something went wrong",
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log(req.body)
        if (!email || !password) {
          return res.status(403).json({
            success: false,
            message: "All fields are required",
          });
        }
      const user = await User.findOne({ email }).populate("todos");
     // console.log(user)
        if (!user) {
              return res.status(403).json({
                success: false,
                message: "User not exists",
              });    
      }
      console.log(user)
        const hashedPassword = await bcrypt.compare(password, user.password);
        if (!hashedPassword) {
            return res.status(400).json({
              success: false,
              message: "Password not mathced",
            });
        }

        const paylod = {
            email: user.email,
            id : user._id
        }
        const options = {
          expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        const token = jwt.sign(paylod, process.env.JWT_SECRET, { expiresIn: "2h" });
        user.token = token;
      
           return res.cookie("token", token, options).status(200).json({
             success: true,
             token,
             user,
             todo: user.todos,
             message: "Logged in successfully",
           });
    } catch (error) {
        return res.status(500).json({
          sucess: false,
            message: "User already registered",
          error : error.message
        });
    }
}

exports.getUser = async (req, res) => {
  try {
    const id = req.user.id;
    //console.log(id)
    const user = await User.findById(id).populate("todos")
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      sucess: false,
      message: "User not found",
      error: error.message,
    });
  }
}

exports.about = async (req, res) => {
  try {
    return res.json({
      dataaa : req.user
    })
  } catch (error) {
    
  }
}

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", "/");
    return res.json({
      data : "logout successfull"
    })
  } catch (error) {
    
  }
}