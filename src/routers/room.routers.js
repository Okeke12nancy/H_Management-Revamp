const express = require("express");
const roomController = require("../controllers/room.controller");
require("./users.router");
const validator = require("../middlewares/validate.middlewares");
const auth = require("../middlewares/authenticator.middlewares");

const {
  CreateRoomSchema,
  UpdateRoomSchema,
  RoomQueryParamsSchema,
} = require("../schemas/room.schema");
const roomRouter = express.Router();

roomRouter.post(
  "/",
  [validator(CreateRoomSchema)],
  [auth],
  roomController.create
);

roomRouter.get(
  "/",
  [validator(RoomQueryParamsSchema, "query")],
  [auth],
  roomController.list
);

roomRouter.get("/:id", [auth], roomController.retrieve);

roomRouter.patch(
  "/:id",
  [validator(UpdateRoomSchema)],
  [auth],
  roomController.update
);

roomRouter.delete("/:id", [auth], roomController.delete);

module.exports = roomRouter;
