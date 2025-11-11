import jwt from 'jsonwebtoken';

export const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message,
      data: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
};

export default sendTokenResponse;
