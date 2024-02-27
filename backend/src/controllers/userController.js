import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();
  res.json(user);
});

export const getProfileDataByID = asyncHandler(async (req, res, next) => {
  const username = req.params.username;

  const profile = await Profile.findOne({
    username: username,
  });

  if (!profile)
    throw new ErrorResponse(`Profile ${username} does not exist!`, 404);

  res.json(profile);
});
