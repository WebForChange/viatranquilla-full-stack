import Trip from "../models/tripModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

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

// Returns all trips created by a user
export const getTripDataByUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const trips = await Trip.find({ creator: userId });

  if (!trips || trips.length === 0)
    throw new ErrorResponse(`This user has no trips!`, 404);

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

// Tonio: Does this return all trips? What is the intention?
export const getTripDataFull = asyncHandler(async (req, res, next) => {
  const trips = await Trip.find();
  if (!trips) throw new ErrorResponse(`There are no trips available`, 404);
  res.json(trips);
});

// export const createTrip = asyncHandler(async (req,res,next) => {
//     const newTrip = new Trip(req.body)
//     await newTrip.save()

//     res.status(201).json(newTrip)
//     if (!newTrip) throw new ErrorResponse(`Trip does not exist`, 404);
//     res.send(newTrip);
// })
