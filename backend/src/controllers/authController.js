import bcrypt from "bcrypt";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

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
    // let user = null;
    const { email, password } = req.body;
    // if (email) {
    //   user = await User.findOne({ email });
    // } else if (username) {
    //   user = await User.findOne({ username });
    // }

    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    const userFromDatabase = await User.findOne({ email }).select('+password');
    if (!userFromDatabase) throw new ErrorResponse('Email does not exist', 404);
  
    const match = await bcrypt.compare(password, userFromDatabase.password);
    if (!userFromDatabase) throw new ErrorResponse('Email or Pasword is incorrect', 401);

    const token = jwt.sign({ userId: userFromDatabase._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // const userId = user._id.toString();
    res.cookie('token', token, {maxAge: 3600000})
    res.send({status: 'The login was successful.'})

    // res.json({ userId, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authUser = asyncHandler(async (req,res,next) => {
  const user = await User.findById(req.userId)
  res.json(user)
})

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
