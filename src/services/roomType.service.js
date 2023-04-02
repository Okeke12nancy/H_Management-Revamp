const RoomType = require("../models/roomType.model");

class RoomTypeService {
  async createNewRoomType(data) {
    const roomType = await RoomType.create(data);

    await roomType.save();

    return roomType;
  }

  async list(filter = {}) {
    const roomType = await RoomType.find(filter);
    return roomType;
  }

  async retrieveById(id) {
    return await RoomType.findById(id);
  }


  async updateOneById(id, update) {
    const roomtype = await RoomType.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    return roomtype;
  }

  async deleteOneById(_id) {
    const roomtype = await RoomType.findByIdAndRemove(_id);

    return roomtype;
  }
}

module.exports = new RoomTypeService();
