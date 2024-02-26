import Trip from '../models/tripModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// export const createTrip = asyncHandler(async (req,res,next) => {
//     const newTrip = new Trip(req.body)
//     await newTrip.save()

//     res.status(201).json(newTrip)
//     if (!newTrip) throw new ErrorResponse(`Trip does not exist`, 404);
//     res.send(newTrip);
// })

export const getTripDataFull = asyncHandler(async (req,res,next) => {
    const trips = await Trip.find()
    res.json(trips)
    if (!trips) throw new ErrorResponse(`There are no trips available`, 404);
    res.send(trips);
})

export const getTripDataByID = asyncHandler(async (req,res,next) => {
    const {id} = req.params;

    const getTripDataByID = await Trip.findById(id);
    res.json(getTripDataByID)
    if(!getTripDataByID) throw new ErrorResponse(`Trip ${id} does not exist!`, 404)
})

export const getTripDataByUser = asyncHandler(async (req,res,next) => {
    const userId = req.params.id;

    const trips = await Trip.find({ creator: userId })
    res.json(trips)
    if(!trips || trips.length === 0) throw new ErrorResponse(`This user has no trips!`, 404)
})

export const getTripDataByQuery = asyncHandler(async (req,res,next) => {
    const query = req.query.query;

    const trips = await Trip.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { location: { $regex: query, $options: 'i' } },
            // { startDate: { $gte: new Date(query) } },
            // { endDate: { $lte: new Date(query) } }
        ]
    }).populate('participants').populate('creator');
        if(!trips || trips.length === 0) throw new ErrorResponse(`No match!`, 404)
        res.json(trips)
    })