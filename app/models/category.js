const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required."],
    minlength: [5, "Category Name must be at least 5 characters long."],
    trim: true,
    unique: true,
  }
});


categorySchema.plugin(uniqueValidator, {
  message: "Category is already in use.",
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
