import crypto from 'crypto';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';
import CustomError from '../utils/CustomError.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { sendTokenResponse } from '../utils/createTokenResponse.js';

const respond = (res, status, message, data = null) =>
  res.status(status).json({
    success: true,
    message,
    data,
  });

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError('User already exists', 400);
  }

  const user = await User.create({ name, email, password });
  sendTokenResponse(user, 201, res, 'User registered successfully');
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new CustomError('Invalid credentials', 401);
  }

  sendTokenResponse(user, 200, res, 'User logged in successfully');
});

export const getMe = asyncHandler(async (req, res) => {
  respond(res, 200, 'Current user fetched successfully', {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError('No user with this email exist', 404);
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
  try {
    await sendEmail({
      to: user.email,
      subject: 'Learnify password reset',
      html: `<p>Hi ${user.name},</p><p>Click the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    });
  } catch (error) {
    throw new CustomError('There is an error with sending email', 500);
  }

  respond(res, 200, 'Password reset instructions sent');
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError('Invalid or expired reset token', 400);
  }

  user.password = password;
  user.passwordChangedAt = Date.now();
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res, 'Password updated successfully');
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  respond(res, 200, 'Logged out successfully');
});
