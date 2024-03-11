import Car from "../models/carModel.js";
import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createCar = asyncHandler(async (req, res, next) => {
    try {
        const { make, model, year, color, seats, image, creator } = req.body;
        const username = req.params.username;
        let Car = null;

        const newCar = await Car.create({
            make: "",
            model: "",
            year: "",
            color: "",
            seats: "",
            image: "",
            creator: username,
          });
          res.status(201).json({ id: newCar._id, username });
    } catch (error) {
        res.status(500).json({ errorCode: error.code, message: error.message });
    }
});