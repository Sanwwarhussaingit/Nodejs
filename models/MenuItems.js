const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["veg", "non-veg", "spicy", "eggs"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
});
const MenuItems = mongoose.model("MenuItems", menuItemSchema);
module.exports = MenuItems;
