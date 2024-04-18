const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "E-mail address is required."],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
      },
      message: "Please filled a valid e-mail address.",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{9,}$/;
        return passwordRegex.test(password);
      },
      message:
        "The password must contain at least 8 characters, including at least 1 number and 1 special character.",
    },
  },
});

userSchema.plugin(uniqueValidator, {
  message: "E-mail address is already in use.",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
