const mongoose = require("mongoose");

const objectSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  colors: { type: [String], required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Object", objectSchema);
