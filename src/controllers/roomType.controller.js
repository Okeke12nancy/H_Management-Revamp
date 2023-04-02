const roomTypeService = require("../services/roomType.service");

class RoomTypeController {
  async create (req, res) {
   const newRoomType = await roomTypeService.createNewRoomType(req.body)

   return res.status(200).send({
    success: true,
    message: "Room type created successfully",
    data: newRoomType
   })
  }

  async list(req, res){
    const roomTypes = await roomTypeService.list()

    return res.status(200).send({
      success: true,
      message: "Room types created successfully",
      data: roomTypes
    })
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
    
    const updatedRoomType = await roomTypeService.updateOneById(
      _id,
      req.body
    );

    return res.status(200).send({
      success: true,
      message: "RoomType updated successfully",
      data: updatedRoomType,
    });
  }

  async delete(req, res) {
    const _id = req.params.id;
    await roomTypeService.deleteOneById(_id);

    return res.status(200).send({
      success: true,
      message: "Room deleted successfully",
    });
  }
}

module.exports = new RoomTypeController();
