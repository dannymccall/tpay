const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Please enter phone"],
    },

    tpayid: {
        type: String,
        required: [true, "Please enter typayid"]
    },
    verified: {
      type: Boolean,
      default: false,
    },

    USERID: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("phoneModel", phoneSchema);
