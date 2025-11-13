import bcrypt from 'bcryptjs';
import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import User from '../models/User.js';

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, avatar },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new CustomError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw new CustomError('Old password is incorrect', 400);
  }

  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

export const deleteAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);

  res.cookie('token', '', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Account deleted successfully',
  });
});
