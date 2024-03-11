import Car from "../models/carModel.js";
import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Item from "../models/itemModel.js"

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
          res.status(201).json({ car: newCar, id: newCar._id, username });
    } catch (error) {
        res.status(500).json({ errorCode: error.code, message: error.message });
    }
});

export const updateCar = asyncHandler(async (req,res,next) => {
    const carId = req.params.id;
    const { make, model, year, color, seats, image } = req.body;

    try {
        let car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({ message: "Car not found!" })
        }

        car.make = make;
        car.model = model;
        car.year = year;
        car.color = color;
        car.seats = seats;
        car.image = image;

        await car.save()

        res.status(200).json({ message: "Car updated!", car })
    } catch (error) {
        res.status(500).json({ errorCode: error.code, message: error.message })
    }
})

export const getVehicleByUsername = asyncHandler(async (req,res,next) => {
    const username = req.params.username;

    try {
        const vehicles = await Car.find({ creator: username });

        res.status(200).json(vehicles)
    } catch (error) {
        res.status(500).json(({ errorCode: error.code, message: error.message }))
    }
})

export const deleteVehicle = asyncHandler(async (req,res,next) => {
    const carId = req.params.id;

    try {
        const car = await Car.findById(carId)

        if (!car) {
            return res.status(404).json({ message: "Car not found!" })
        }

        await car.remoce()

        res.status(200).json({ message: "Car deleted!" })
    } catch (error) {
        res.status(500).json({ errorCode: error.code, message: error.message })
    }
})

export const getItemsByUsername = asyncHandler(async (req,res,next) => {
    const username = req.params.username;

    try {
        const items = await Item.find({ creator: username })

        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ errorCode: error.code, message: error.message })
    }
})

export const createItem = asyncHandler(async (req,res,next) => {
    const { name, description, image, quantity, category, visibility, creator } = req.body;

    try {
        const newItem = await Item.create({
            name,
            description,
            image,
            quantity,
            category,
            visibility,
            creator
        });

        res.status(201).json({ item: newItem })
    } catch (error) {
        res.status(500).json({ errorCode: error.code, message: error.message })
    }
})