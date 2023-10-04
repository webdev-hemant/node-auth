const { Schema, model } = require("mongoose");
const { checkIfEmail } = require("../../helper/commonValidation");
// const bcrypt = require("bcrypt");

const userModel = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required!"],
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, "last name is required!"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: true,
      lowercase: true,
      validate: [checkIfEmail, "please enter valid email!"],
    },
    password: {
      type: String,
      minLength: [6, "password should be minimum 6 charactor"],
      required: [true, "email is required!"],
    },
    dob: {
      type: Date,
      required: [true, "date of birth is required!"],
    },
    roles: {
      type: [String],
      default: ["basic"],
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// userModel.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

module.exports = model("signup", userModel);
