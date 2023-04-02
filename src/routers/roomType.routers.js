const express = require("express");
const roomTypeController = require("../controllers/roomType.controller");
const validator = require("../middlewares/validate.middlewares");
const auth = require("../middlewares/authenticator.middlewares")
const authorize = require("../middlewares/authorization.middlewares")
const { CreateRoomTypeSchema, UpdateRoomTypeSchema } = require("../schemas/roomType.schema");
const roomTypeRouter = new express.Router();

roomTypeRouter.post("/", [
  validator(CreateRoomTypeSchema)
],[auth, authorize], roomTypeController.create);

roomTypeRouter.get("/",[auth], roomTypeController.list);

roomTypeRouter.get("/:id",[auth], roomTypeController.retrieve);

roomTypeRouter.patch("/:id", [auth, authorize], [validator(UpdateRoomTypeSchema)], roomTypeController.update);

roomTypeRouter.delete("/:id", [auth, authorize],roomTypeController.delete);

module.exports = roomTypeRouter;