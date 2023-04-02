const UserService = require("../services/user.service");
const _ = require("lodash");

class UserController {
  async create(req, res) {
    const newUser = await UserService.createNewUser(req.body);
    return res.status(201).send({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  }

  async login(req, res) {
    const loginUser = await UserService.loginUser(req.body.email, req.body.password);
    // const shownData = (_.pick(loginUser, ["name","email"]))
    if (!loginUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      data: loginUser
    })
  }

  // async logout(req, res) {
  //   const logoutUser = await UserService.logOutUser(req.user)
  //   if (logoutUser) {
  //     return res.status(200).send({
  //       success: true,
  //       message: "User logged out successfully",
      
  //     })
  //   }

  //   return res.status(404).send({
  //     success: false,
  //     message: "Logout was not successful",

  //   })
  // }
  // async logoutAll(req, res) {
  //   const logoutAllUser = await UserService.logOutUser()
  //   if (logoutAllUser) {
  //    req.user.token = []
  //     await req.user.save();
  //     return res.status(200).send({
  //       success: true,
  //       message: " All User logged out successfully",
      
  //     })
  //   }

  //   return res.status(404).send({
  //     success: false,
  //     message: "Logout was not successful",

  //   })
  // }

  async list(req, res) {
    req.body = res.send(req.user)
    const listUsers = await UserService.listAll(req.body);
    if (_.isEmpty(listUsers)) {
      return res.status(404).send({
        success: false,
        message: "It is empty",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User listed successfully",
      data: listUsers,
    });
  }


  async update(req, res) {
    
    
    const updatedUser = await UserService.updateOne(
      req.user,
      req.body
    );

    const {body } = req

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  }

  async delete(req, res) {
    await UserService.delete(req.user);


    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      
    });
  }
}

module.exports = new UserController();
