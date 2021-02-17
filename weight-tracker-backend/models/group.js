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
    users: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Group", groupSchema);

module.exports = User;
