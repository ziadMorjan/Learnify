import { validationResult } from 'express-validator';
import CustomError from '../utils/CustomError.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((err) => err.msg)
      .join(', ');
    throw new CustomError(message, 400);
  }
  next();
};

export default validateRequest;
