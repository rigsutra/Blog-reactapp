import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
  },
  { timestamps: true }
  // the timestamp is to record time and all of the user every time.
);

const User = mongoose.model("User", userSchema);

// we are creating a new user model using this

export default User;
