import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const register = async (req, res) => {
  try {
    //     const { username, email, password } = req.body;
    //     const hashedPassword = await bcrypt.hash(password, 12);

    //     const newUser = await User.create({
    //       username,
    //       email,
    //       password: hashedPassword,
    //     });

    //     const token = jwt.sign({ userId: newUser._id }, "yourSecretKey", {
    //       expiresIn: "1h",
    //     });

    //     res.status(201).json({ user: newUser, token });
    res.status(200).json({ message: "register route works" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // const user = await User.findOne({ email });

    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // const token = jwt.sign({ userId: user._id }, "yourSecretKey", {
    //   expiresIn: "1h",
    // });

    // res.json({ user, token });
    res.status(200).json({ message: "login route works" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  // Implement logout functionality based on your auth strategy.
  // For JWT, you might just inform the client to delete the token
  res.json({ message: "Logged out successfully" });
};

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
