import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import CustomError from '../utils/CustomError.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return next(new CustomError('Not authorized, token missing', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new CustomError('Not authorized, user not found', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new CustomError('Not authorized, token invalid', 401));
  }
};

export default protect;
