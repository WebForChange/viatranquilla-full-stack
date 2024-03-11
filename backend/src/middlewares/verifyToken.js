import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token:", token);

  if (!token) {
    return res.status(401).send("Login token not found.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.userId;
  req.user = decoded;
  req.username = decoded.username;
  next();
});

export default verifyToken;
