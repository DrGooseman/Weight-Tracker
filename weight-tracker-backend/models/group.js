const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    users: [
      { userId: { type: Schema.Types.ObjectId, required: true, ref: "user" } },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Group", groupSchema);

module.exports = User;
