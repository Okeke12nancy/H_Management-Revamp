const roomTypeRouter = require("./roomType.routers");
const roomRouter = require("./room.routers");
const userRouter = require("./users.router")

const basePath = '/api/v1';

module.exports = (app) => {
  app.use(`${basePath}/room-types`, roomTypeRouter);
  app.use(`${basePath}/rooms`, roomRouter);
  app.use(`${basePath}/users`, userRouter);
};
