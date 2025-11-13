import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import CustomError from '../utils/CustomError.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
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
    if (user.passwordChangedAt && Date.parse(user.passwordChangedAt) > decoded.iat * 1000)
      return next(new CustomError('You changed your password recently, please login again.', 401));

    req.user = user;
    next();
  } catch (error) {
    next(new CustomError('Not authorized, token invalid', 401));
  }
};

export default protect;
