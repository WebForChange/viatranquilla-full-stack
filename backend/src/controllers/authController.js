import bcrypt from "bcrypt";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendConfirmationEmail } from "../utils/EmailService.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    let existingUser = null;
    existingUser = await User.findOne({ email });
    if (!existingUser) {
      existingUser = await User.findOne({ username });
    }
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await sendConfirmationEmail(email, username);

    const newProfile = await Profile.create({
      username: username,
      firstName: "",
      lastName: "",
      birthDate: "",
      phone: "",
      street: "",
      houseNumber: "",
      zip: "",
      city: "",
      country: "",
      state: "",
      profilePicture: "",
      bio: "",
      createdTrips: [],
      joinedTrips: [],
    });

    const token = jwt.sign(
      { userId: newUser._id, username: username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const decodedToken = jwt.decode(token);
    console.log("Token Expiration Time:", new Date(decodedToken.exp * 1000));

    res.status(201).json({ id: newUser._id, username, token });
  } catch (error) {
    res.status(500).json({ errorCode: error.code, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new ErrorResponse("Email does not exist", 404);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ErrorResponse("Email or Pasword is incorrect", 401);

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const userId = user._id.toString();
    res.cookie("token", token, { maxAge: 3600000 });
    res.json({
      userId: userId,
      username: user.username,
      status: "The login was successful.",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false, // set to true in production. HTTPS not setup on local server
    })
    .status(200)
    .json({
      message: "Logged out successfully. Client should now delete token.",
    });
});

export const registerCheck = async (req, res) => {
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

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.params.username;
    const usernameExists = await !!User.findOne({ username });
    res.status(200).json({ usernameExists: usernameExists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
