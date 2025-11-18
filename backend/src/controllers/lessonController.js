import Lesson from '../models/Lesson.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const deriveTitle = (providedTitle, originalName) => {
  const trimmed = (providedTitle || '').trim();
  if (trimmed) return trimmed;
  if (!originalName) return 'Untitled Lesson';
  return originalName.replace(/\.[^/.]+$/, '');
};

export const uploadLesson = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new CustomError('File is required', 400);
  }

  const uploadResult = await uploadToCloudinary(req.file.path);

  const lesson = await Lesson.create({
    title: deriveTitle(req.body.title, req.file.originalname),
    originalName: req.file.originalname,
    fileUrl: uploadResult.secure_url,
    fileType: req.file.mimetype,
    fileSize: req.file.size,
    owner: req.user.id,
    cloudinaryPublicId: uploadResult.public_id,
  });

  return res.status(200).json({
    success: true,
    message: 'Lesson uploaded successfully',
    data: { lesson },
  });
});

export const getMyLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({ owner: req.user.id }).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: 'Lessons fetched successfully',
    data: { lessons },
  });
});

export const getLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    throw new CustomError('Lesson not found', 404);
  }

  if (lesson.owner.toString() !== req.user.id.toString()) {
    throw new CustomError('You are not authorized to view this lesson', 403);
  }

  return res.status(200).json({
    success: true,
    message: 'Lesson fetched successfully',
    data: { lesson },
  });
});

export const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    throw new CustomError('Lesson not found', 404);
  }

  if (lesson.owner.toString() !== req.user.id.toString()) {
    throw new CustomError('You are not authorized to delete this lesson', 403);
  }

  await deleteFromCloudinary(lesson.cloudinaryPublicId);
  await lesson.deleteOne();

  return res.status(204).json({
    success: true,
    message: 'Lesson deleted successfully',
    data: null,
  });
});
