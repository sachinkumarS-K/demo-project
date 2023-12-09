const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already registered"],
      trim: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      
    },
    resetPasswordExpires: {
      type: Date,
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next){
  try {
    console.log(this.firstName)
    if (this.isModified("password")) {
      console.log("saved");
    } else {
      console.log("not saved");
    }
    next();
  } catch (error) {
    console.log(error)
  }
  
})

module.exports = mongoose.model("User", userSchema);
