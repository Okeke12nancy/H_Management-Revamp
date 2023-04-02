const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 250,
      trim: true,

    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false
    // },
    roles: {type: String,
      enum: ["admin", "guest"],
      default: "guest"
     },
    // permissions: ["add", "edit", "delete", "list"],

    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this
  const userData = user.toObject()

  delete userData.password
  delete userData.tokens

  return userData
}
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET_SIGNATURE);
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

// userSchema.statics.logOut = async  () => {
//   const user = await User.exists({tokens})
//   user.tokens =  token.token !== token
  
//   // user.tokens = user.tokens.filter((token) => {
//   //   return token.token !== token
//   // })
//   await user.save();
// }

userSchema.statics.findByCredentials = async(email, password) => {
  const user = await User.findOne({email})
  if (!user) {
    throw new Error("Unable to login")
  }
  const isMatchPassword = await bcrypt.compare(password, user.password)
  if (!isMatchPassword) {
    throw new Error("Unable to login")
  }
  return user;
}

userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next();
})

userSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;