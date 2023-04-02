const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomTypeSchema = new Schema(
  {
    name: {
      type: String,
      default: "single",
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

roomTypeSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

const RoomType = mongoose.model("RoomType", roomTypeSchema);

module.exports = RoomType;
