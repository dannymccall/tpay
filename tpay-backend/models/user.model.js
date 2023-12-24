const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter username"],
    },

    middlename: {
      type: String,
      required: [true, "Please enter lastname"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter lastname"],
    },

    username: {
      type: String,
      required: [true, "Please enter username"],
    },

    phone: {
      type: String,
      required: [true, "Please enter phone number"],
    },
    file: {
      type: String,
    },

    creditscore: {
      type: Number,
      default: 0,
    },
    USERID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userAuthSchema);
