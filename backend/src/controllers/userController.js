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
    username: new RegExp(`^${username}$`, "i"), // not case senitive anymore
  });

  if (!profile)
    throw new ErrorResponse(`Profile ${username} does not exist!`, 404);

  res.json(profile);
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  try {
    const username = req.params.username;

    const profile = await Profile.findOne({
      username: username,
    });

    if (!profile)
      throw new ErrorResponse(`Profile ${username} does not exist!`, 404);

    profile.bio = req.body.bio;
    profile.firstName = req.body.firstName;
    profile.lastName = req.body.lastName;
    if (req.body.birthDate && !isNaN(new Date(req.body.birthDate).valueOf())) {
      profile.birthDate = new Date(req.body.birthDate);
    } else {
      profile.birthDate = null; // or set to a default date if needed
    }
    profile.phone = req.body.phone;
    profile.street = req.body.street;
    profile.houseNumber = req.body.houseNumber;
    profile.zip = req.body.zip;
    profile.city = req.body.city;
    profile.country = req.body.country;
    profile.state = req.body.state;

    // Check if req.fileUrl is available and not empty
    if (req.fileUrl) {
      profile.profilePicture = req.fileUrl;
    }

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getFriends = asyncHandler(async (req, res, next) => {
  const username = req.params.username;

  const profile = await Profile.findOne({
    username: username,
  });

  if (!profile) {
    console.log(`Profile ${username} does not exist!`);
    return res
      .status(404)
      .json({ message: `Profile ${username} does not exist!` });
  }

  let friends = [];
  try {
    for (let i = 0; i < profile.friends.length; i++) {
      let friendProfile = await Profile.findOne({
        username: profile.friends[i],
      });
      friends.push({
        username: profile.friends[i],
        profilePicture: friendProfile.profilePicture,
      });
    }
  } catch (error) {
    console.log("UserController: error building friendlist: ", error);
    return res.status(500).json({
      message: "UserController: error building friendlist: " + error.message,
    });
  }

  res.status(200).json(friends);
});

export const addFriend = asyncHandler(async (req, res, next) => {
  const username = req.username;
  const friendUsername = req.params.username;

  const profile = await Profile.findOne({
    username: username,
  });
  if (!profile) {
    return res
      .status(404)
      .json({ message: `Profile ${profile} does not exist!` });
  }

  const friendProfile = await Profile.findOne({
    username: friendUsername,
  });

  if (!friendProfile) {
    return res
      .status(404)
      .json({ message: `Profile ${friendUsername} does not exist!` });
  }

  if (profile.friends.includes(friendProfile._id)) {
    return res.status(409).json({
      message: `${username} is already friends with ${friendUsername}.`,
    });
  }

  profile.friends.push(friendUsername);
  friendProfile.friends.push(username);

  await profile.save();
  await friendProfile.save();

  res.json(profile.friends);
});

export const removeFriend = asyncHandler(async (req, res, next) => {
  const username = req.username;
  const friendUsername = req.params.username;

  const profile = await Profile.findOne({
    username: username,
  });

  const friendProfile = await Profile.findOne({
    username: friendUsername,
  });

  if (!profile.friends.includes(friendUsername)) {
    return res.status(409).json({
      message: `${username} is not friends with ${friendUsername}.`,
    });
  }

  profile.friends.pull(friendUsername);
  friendProfile.friends.pull(username);

  await profile.save();
  await friendProfile.save();

  res.json(profile.friends);
});
