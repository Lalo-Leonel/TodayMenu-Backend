const { Schema, model } = require("mongoose");

const nameFood = new Schema(
  {
    name: {
      type: String,
      required: [true, "the name of the food is required"]
    },
    available:{
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0
    }
  }
)

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
      type: [nameFood],
      default: {}
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
