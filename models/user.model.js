const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const useSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

useSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

const User = model("User", useSchema);
module.exports = User;
