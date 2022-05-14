const { Schema, model } = require("mongoose");

const menusSchema = new Schema(
  {
    typeMenu: {
      type: String,
      required: [true, "the menu type field is required"],
      enum: {
        values: ["breakfast", "lunch", "dinner"],
        message: "invalid menu type",
      },
    },
    cost: {
      type: Number,
      required: [true, "cost is required"],
    },
    soupNames: {
      type: [String],
    },
    secondNames: {
      type: [String],
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

const Menu = model("Menu", menusSchema);

module.exports = Menu;
