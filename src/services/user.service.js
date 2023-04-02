// const { token } = require("morgan");
const User = require("../models/user.model");



class UserService {
  async createNewUser(data) {
    // const user = await User.create(data);
    const user = new User(data);
    const token = await user.generateAuthToken()
    await user.save();
    return ({user,token});
  }

  async loginUser(email, password) {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()
    return ({user,token});
  }

  // async logOutUser() {
  //   const user =  await User.logOut()
  //     await user.save();
  // }

  async listAll() {
    const user = await User.find({});
    
    return user;
  }


  async updateOne(use, update) {
    const user = await User.find(use, update, {
      new: true,
      runValidators: true,
    });

    return user;
  }
  

  async delete() {
    await User.findOneAndRemove();
  
  }
}

module.exports = new UserService();