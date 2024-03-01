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
