const mongoose = require("mongoose");

const GiftsSchema = new mongoose.Schema(
  {
    tpayid: {
      type:String,
      required: [true, 'Please enter the T-Pay id'],
    },

    gift: {
     type: String,
      required: [true, "Please enter gift"],
    },

    redeemed: {
      type: Boolean,
      default: false,
    },

    voucher: {
      type: "String",
      required: [true, "Please enter voucher"],
    },

    receivedGift: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gifts", GiftsSchema);
