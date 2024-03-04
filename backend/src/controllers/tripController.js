import Trip from "../models/tripModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createTrip = asyncHandler(async (req, res, next) => {
  const username = req.username;

  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  try {
    Prfile.findOneAndUpdate(
      { username: username },
      { $push: { createdTrips: newTrip._id } }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(201).json(newTrip);
});

// Returns a trip by its ID
export const getTripDataByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const getTripDataByID = await Trip.findById(id);

  if (!getTripDataByID)
    throw new ErrorResponse(`Trip ${id} does not exist!`, 404);

  res.json(getTripDataByID);
});

// Returns the logged in user's trips
// For dashboard, ...
// Currently returns all created and joined trips regardless of date
export const getUserTrips = asyncHandler(async (req, res, next) => {
  const username = req.username;

  if (!username)
    throw new ErrorResponse(`Couldn't retrieve username from token`, 500);

  const user = await Profile.find({ username: username });
  const trips = [...new Set([...user.createdTrips, ...user.joinedTrips])];

  if (!trips || trips.length === 0)
    throw new ErrorResponse(`This user has no trips!`, 404);

  res.json(trips);
});

// Returns the trips which the logged in user is invited to
// For dashboard, ...
export const getInvitedTrips = asyncHandler(async (req, res, next) => {
  const username = req.username;

  if (!username)
    throw new ErrorResponse(`Couldn't retrieve username from token`, 500);

  const trips = await Profile.find({ username: username }).invitedToTrips;

  if (!trips || trips.length === 0)
    throw new ErrorResponse(`This user has no trips!`, 404);

  res.json(trips);
});

// Returns a user's trips by username
// Currently returns all created and joined trips regardless of date
export const getTripDataByUser = asyncHandler(async (req, res, next) => {
  const username = req.params.username;

  if (!username) res.status(404).json({ message: "Username not found" });

  const profile = await Profile.find({ username: username });

  if (!profile) res.status(404).json({ message: "User Profile not found" });

  const trips = [...new Set([...profile.createdTrips, ...profile.joinedTrips])];

  if (!trips || trips.length === 0)
    res.status(404).json({ message: "This user has no trips!" });

  res.json(trips);
});

export const getTripDataByQuery = asyncHandler(async (req, res, next) => {
  const query = req.query.query;

  const trips = await Trip.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      // { startDate: { $gte: new Date(query) } },  NEED HEEEELP :D
      // { endDate: { $lte: new Date(query) } }
    ],
  })
    .populate("participants")
    .populate("creator");

  if (!trips || trips.length === 0) throw new ErrorResponse(`No match!`, 404);

  res.json(trips);
});

// Tonio: Does this return all trips of all users? What is the intention?
export const getTripDataFull = asyncHandler(async (req, res, next) => {
  const trips = await Trip.find();
  if (!trips) throw new ErrorResponse(`There are no trips available`, 404);
  res.json(trips);
});
