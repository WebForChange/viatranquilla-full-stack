import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from '../utils/ErrorResponse.js';

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const user = await User.findOne({ username });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userId = user._id.toString();

    res.json({ userId, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // set to true in production. HTTPS not setup on local server
  });
  res.status(200).send({
    status: "success",
    message: "Logged out successfully. Client should now delete token.",
  });
});

const registerCheck = async (req, res) => {
  try {
    const { email, username } = req.body;
    const emailTaken = await User.findOne({ email });
    const usernameTaken = await User.findOne({ username });
    res
      .status(200)
      .json({ emailTaken: !!emailTaken, usernameTaken: !!usernameTaken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login, logout, registerCheck };
