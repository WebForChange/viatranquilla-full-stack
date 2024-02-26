import User from '../models/userModel.js'
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllUser = asyncHandler(async (req,res,next) => {
    const user = await User.find();
    res.json(user)
})

export const getProfileDataByID = asyncHandler(async (req,res,next) => {
    const {id} = req.params;

    const profileDataByID = await User.findById(id);
    if(!profileDataByID) throw new ErrorResponse(`Profile ${id} does not exist!`, 404)
    res.json(profileDataByID)
})