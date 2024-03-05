import Preferences from "../models/preferencesModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getPreferences = asyncHandler(async (req, res, next) => {
  const username = req.username;

  if (!username)
    throw new ErrorResponse(`Couldn't retrieve username from token`, 500);

  const preferences = await Preferences.findOne({ username: username });

  if (!preferences)
    throw new ErrorResponse(`This user has no preferences!`, 404);

  res.json(preferences);
});

export const setPreferences = asyncHandler(async (req, res, next) => {
  const username = req.username;

  if (!username)
    throw new ErrorResponse(`Couldn't retrieve username from token`, 500);

  const preferences = await Preferences.findOneAndUpdate(
    { username: username },
    req.body,
    { new: true, upsert: true }
  );

  if (!preferences)
    throw new ErrorResponse(`Couldn't update preferences!`, 500);

  res.status(200).json(preferences);
});
