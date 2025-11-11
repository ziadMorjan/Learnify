import fs from 'fs';
import path from 'path';
import CustomError from '../utils/CustomError.js';

const logDirectory = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logErrorToFile = (error) => {
  const logPath = path.join(logDirectory, 'error.log');
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${error.statusCode || 500} - ${error.message}\n${
    error.stack
  }\n\n`;
  fs.appendFileSync(logPath, logMessage, 'utf8');
};

const sendDevError = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    console.error('❌ UNEXPECTED ERROR:', err);
    logErrorToFile(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    err = new CustomError(message, 400);
  }

  if (err.code === 11000) {
    err = new CustomError('Duplicate field value entered', 400);
  }

  if (err.name === 'CastError') {
    err = new CustomError(`Invalid ID: ${err.value}`, 400);
  }

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else {
    sendProdError(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    logErrorToFile(err);
  }
};

export default errorHandler;
