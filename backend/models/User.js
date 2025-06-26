const mongoose = require("mongoose");
const schema = mongoose.schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "reader" }, // roles: reader, author, admin
});

module.exports = mongoose.model("User", userSchema);
