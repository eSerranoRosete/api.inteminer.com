const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  active: { type: Boolean, default: true },
  phone: { type: Number, required: false },
  organization: { type: String, required: false },
  title: { type: String, required: false },
  cardSettings: Object,
  social: Object,
  extra: Object,
});

module.exports = mongoose.model("Users", userSchema);
