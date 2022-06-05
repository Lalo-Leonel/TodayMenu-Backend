const { Schema, model } = require("mongoose");

const businessSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "the name of business is required"],
    },
    logo: {
      type: String,
      required: [true, "logo is required"],
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

const Business = model("Business", businessSchema);

module.exports = Business;
