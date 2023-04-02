const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const roomSchema = new Schema({
  name: {
    type: String,
    default: "Room 0",
    required: true,
    trim: true
  },
  roomType: { type: ObjectId, required: true, ref: "RoomType" },
  price: { type: Number, required: true }
}, { timestamps: true })

roomSchema.set('toJSON', {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  }
});

const Room = mongoose.model("Room", roomSchema)

module.exports = Room