import User from '../models/userModel.js'
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllUser = asyncHandler(async (req,res,next) => {
    const user = await User.find();
    res.json(user)
})
