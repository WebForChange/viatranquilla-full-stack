import Car from "../models/carModel.js";
import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const createCar = asyncHandler(async (req, res, next) => {
    try {
        const { make, model, year, color, seats, image, creator } = req.body;
        let Car = null;

        const newCar = await Profile.create({
            make: "",
            model: "",
            year: "",
            color: "",
            seats: "",
            image: "",
            creator: "",
          });
    }
}