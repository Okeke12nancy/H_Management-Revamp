const express = require("express");
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middlewares");
const auth = require("../middlewares/authenticator.middlewares");
const {
  CreateUserSchema,
  LoginUserSchema,
  UpdateUserSchema,
} = require("../schemas/user.schema");
const userRouter = express.Router();

// userRouter.post("/",  userController.create);
userRouter.post("/", [validate(CreateUserSchema)], userController.create);

userRouter.post("/login",[validate(LoginUserSchema)], userController.login);

// userRouter.post("/logout",auth, userController.logout);

// userRouter.post("/logoutAll", auth,userController.logoutAll);

// getting only the logged in user
userRouter.get("/me", auth, userController.list);

// userRouter.get("/:id", userController.retrieve);

// updating only the logged in user

userRouter.patch("/me", [validate(UpdateUserSchema)], auth,  userController.update);


// only the logged in user can delete the profile
userRouter.delete("/me", auth, userController.delete);

module.exports = userRouter;
