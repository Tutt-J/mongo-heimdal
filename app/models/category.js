const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new mongoose.Schema({
  name: {
    type: string,
    required: [true, "Category name is required."],
    minlength: [5, "Category Name must be at least 5 characters long."],
    trim: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

userSchema.plugin(uniqueValidator, {
  message: "Category is already in use.",
});

module.exports = Category;
