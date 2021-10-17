const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Event",
    },
  ],
});

const User = mongoose.model("User", userSchema);
exports.User = User;
