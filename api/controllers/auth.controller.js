import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !email ||
    !password ||
    !username ||
    username.length === 0 ||
    password.length === 0 ||
    email.length === 0
  ) {
    next(errorHandler(400, "Invalid username or password"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("signup successful");
  } catch (error) {
    next(error);
  }
};
