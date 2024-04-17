const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: string }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
