import {Schema, model, models} from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please enter a valid email address"
    ]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
    select: false
  },
  fullname: {
    type: String,
    required: [true, "Please enter a full name"],
    maxlength: [30, "Maximum full name length is 50 characters"],
    minlength: [3, "Minimum full name length is 6 characters"]
  }

});

const User = models.User || model("User", UserSchema);
export default User;