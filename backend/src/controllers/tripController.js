import Trip from "../models/tripModel.js";
import Connection from "../models/connectionModel.js";
import Profile from "../models/profileModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { connections } from "mongoose";

// Creates a new trip
export const createTrip = asyncHandler(async (req, res, next) => {
  const username = req.username;
  if (!username) return res.status(401).json({ message: "Username not found" });
  req.body.creator = username;
  //   console.log("req.body: ", req.body);

  try {
    req.body.connections = req.body.connections.map((connection) => {
      const newConnection = new Connection(connection);
      newConnection.save();
      return newConnection;
    });
  } catch (error) {
    console.log("error creating connections: ", error.message);
    return res.status(500).json({ message: error.message });
  }

  let newTrip = null;

  try {
    newTrip = new Trip(req.body);
    await newTrip.save();
  } catch (error) {
    console.log("error saving new trip: ", error.message);
    return res.status(500).json({ message: error.message });
  }

  if (!newTrip) {
    console.log("TripController: Created trip is null or undefined");
    return res.status(500).json({ message: "Trip could not be created" });
  }

  try {
    await Profile.findOneAndUpdate(
      { username: username },
      { $push: { createdTrips: newTrip._id } }
    );
  } catch (error) {
    console.log(
      "error adding new trip to profile created trips: ",
      error.message
    );
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(newTrip);
});

// Updates a trip
export const updateTrip = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(200).json(updatedTrip);
});

// Delete all trips created by a user
export const deleteTrips = asyncHandler(async (req, res, next) => {
  const { username } = req.params;

  const profile = await Profile.findOne({ username });
  const trips = profile.createdTrips;

  try {
    await Trip.deleteMany({ _id: { $in: trips } });
  } catch (error) {
    console.log("tripController: error deleting Trips: ", error.message);
    return res.status(500).json({ message: error.message });
  }

  try {
    await Profile.findOneAndUpdate(
      { username: username },
      { createdTrips: [] }
    );
  } catch (error) {
    console.log("error deleting trips from profile: ", error.message);
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({ message: `Trips deleted!` });
});

// Deletes a trip
export const deleteTrip = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  //TODO: Remove trip from User's trip lists

  try {
    await Trip.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(200).json({ message: `Trip ${id} deleted!` });
});

// Returns a trip by its ID
export const getTripDataByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const trip = await Trip.findById(id);

  if (!trip) {
    console.log("TripController: Trip does not exist!");
    return res.status(404).json({ message: `Trip ${id} does not exist!` });
  }

  // get profile pictures of participants
  let participantsWithPictures = [];

  for (let username of trip.participants) {
    try {
      const profile = await Profile.findOne({ username: username });

      if (!profile) {
        console.log(
          "TripController: Profile not found for username: ",
          username
        );
        // Todo: decide how to handle this case. Continuing skips the current iteration.
        continue;
      }

      //   console.log("TripController: profile picture: ", profile.profilePicture);
      participantsWithPictures.push({
        username: username,
        profilePicture: profile.profilePicture,
      });
    } catch (error) {
      console.error("Error fetching profile for username: ", username, error);
      // Todo: Decide how to handle this error. For example continue to the next iteration.
      continue;
    }
  }

  try {
    const connections = await Connection.find({
      _id: { $in: trip.connections },
    });
    trip.connections = connections;
  } catch (error) {
    console.log("tripController: error fetching connections: ", error.message);
    return res.status(500).json({ message: error.message });
  }

  res
    .status(200)
    .json({ ...trip.toObject(), participants: participantsWithPictures });
});

// Currently returns user's created and joined trips regardless of date
export const getUserTrips = asyncHandler(async (req, res, next) => {
  const username = req.username;

  if (!username)
    return res
      .status(401)
      .json({ message: `Couldn't retrieve username from token` });

  let profile = null;
  let trips = null;

  try {
    profile = await Profile.findOne({ username: username });
    trips = [...new Set([...profile.createdTrips, ...profile.joinedTrips])];
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching trips from database." });
  }

  trips = await Trip.find({ _id: { $in: trips } });

  if (!trips)
    return res
      .status(500)
      .json({ message: "Error fetching trips from database." });

  res.status(200).json(trips);
});

// Returns the trips which the logged in user is invited to
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

  if (!username) return res.status(404).json({ message: "Username not found" });

  const profile = await Profile.findOne({ username: username });

  if (!profile)
    return res.status(404).json({ message: "User Profile not found" });

  let trips = null;

  try {
    trips = [...new Set([...profile.createdTrips, ...profile.joinedTrips])];
  } catch (error) {
    res.status(404).json({
      message: "Error fetching trips from database!",
      error: error.message,
    });
  }

  trips = await Trip.find({ _id: { $in: trips } });

  if (!trips) {
    res
      .status(500)
      .json({ message: "Couldn't fetch user trips from database" });
  }

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
