import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();
  res.json(user);
});

export const getProfileDataByUsername = asyncHandler(async (req, res, next) => {
  const username = req.params.username;

  const profile = await Profile.findOne({
    username: new RegExp(`^${username}$`, 'i'), // not case senitive anymore
  });

  if (!profile)
    throw new ErrorResponse(`Profile ${username} does not exist!`, 404);

  res.json(profile);
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const username = req.params.username;

  const profile = await Profile.findOne({
    username: username,
  });

  if (!profile)
    throw new ErrorResponse(`Profile ${username} does not exist!`, 404);

  profile.bio = req.body.bio;
  profile.firstName = req.body.firstName;
  profile.lastName = req.body.lastName;
  profile.birthDate = new Date(req.body.birthDate);
  profile.phone = req.body.phone;
  profile.street = req.body.street;
  profile.houseNumber = req.body.houseNumber;
  profile.zip = req.body.zip;
  profile.city = req.body.city;
  profile.country = req.body.country;
  profile.state = req.body.state;
  profile.profilePicture = req.body.profilePicture;
  

  await profile.save();

  res.json(profile);
});

export const getFriends = asyncHandler(async (req, res, next) => {
  const username = req.params.username;

  const profile = await Profile.findOne({
    username: username,
  });

  if (!profile)
    throw new ErrorResponse(`Profile ${username} does not exist!`, 404);

  res.json(profile.friends);
});

// WIP
export const addFriend = asyncHandler(async (req, res, next) => {
  const friendUsername = req.params.username;
  // const profile ID = TODO

  //const profile = await Profile.findById( TODO )

  if (!profile)
    throw new ErrorResponse(`Profile ${username} does not exist!`, 404);

  const friendProfile = await Profile.findOne({
    username: friendUsername,
  });

  if (!friendProfile)
    throw new ErrorResponse(`Profile ${friendUsername} does not exist!`, 404);

  if (profile.friends.includes(friendProfile._id))
    throw new ErrorResponse(
      `Profile ${username} is already friend with ${friendUsername}!`,
      400
    );

  profile.friends.push(friendProfile._id);
  friendProfile.friends.push(profile._id);

  await profile.save();
  await friendProfile.save();

  res.json(profile.friends);
});
