import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import CustomError from './CustomError.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath, folder = 'learnify/lessons') => {
  if (!filePath) {
    throw new CustomError('File path is required for Cloudinary upload', 500);
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'raw',
    });
    return result;
  } finally {
    await fs.unlink(filePath).catch(() => {});
  }
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) {
    return;
  }

  await cloudinary.uploader.destroy(publicId, {
    resource_type: 'raw',
    invalidate: true,
  });
};
