import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) throw new ErrorResponse('Please login', 204);

     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.userId = decoded.userId;
     next();
});

export default verifyToken;