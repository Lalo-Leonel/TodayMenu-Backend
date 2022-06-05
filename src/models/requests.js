const { Schema, model } = require("mongoose");

const requestsSchema = new Schema(
  {
    tableNumber: {
      type: Number,
      required: [true, "the table number is required"],
    },
    numberDiner: {
      type: Number,
      required: [true, "Number of diners is required"],
    },
    secondQuatity: {
      type: [Number],
      required: [true, "Quatity of second is required"],
    },
    menu: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = model("Request", requestsSchema);

module.exports = Request;
