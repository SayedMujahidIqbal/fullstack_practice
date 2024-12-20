const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 4,
  },
  phone: {
    type: String,
    minLength: 5,
  },
  street: {
    type: String,
    required: true,
    minLength: 3,
  },
  city: {
    type: String,
    required: true,
    minLength: 3,
  },
  friendOf: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Person", schema);
