const roomTypeService = require("../services/roomType.service");
const roomService = require("../services/room.service");
const _ = require("lodash");

class RoomController {
  async create(req, res) {
    const roomType = await roomTypeService.retrieveById(req.body.roomType);

    if (!roomType) {
      return res.status(404).send({
        success: false,
        message: "The provided Room type was not found",
      });
    }

    const newRoom = await roomService.createNewRoom(req.body);
    return res.status(201).send({
      success: true,
      message: "Room created successfully",
      data: newRoom,
    });
  }

  async list(req, res) {
    const rooms = await roomService.list(req.query);

    if (_.isEmpty(rooms)) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Room listed successfully",
      data: rooms,
    });
  }

  async retrieve(req, res) {
    const _id = req.params.id;

    const room = await roomService.retrieveById(_id);

    if (!room) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }

    return res.status().send({
      success: true,
      message: "Room retrieved successfully",
      data: room,
    });
  }

  async update(req, res) {
    const _id = req.params.id;
    
    const updatedRoom = await roomService.updateOneById(
      _id,
      req.body
    );

    const {body } = req

    return res.status(200).send({
      success: true,
      message: "Room updated successfully",
      data: updatedRoom,
    });
  }

  async delete(req, res) {
    const _id = req.params.id;
    await roomService.deleteOneById(_id);

    return res.status(200).send({
      success: true,
      message: "Room deleted successfully",
    });
  }
}

module.exports = new RoomController();
