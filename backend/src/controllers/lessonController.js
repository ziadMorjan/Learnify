import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import Lesson from '../models/Lesson.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import Flashcard from '../models/Flashcard.js';

const deriveTitle = (providedTitle, originalName) => {
  const trimmed = (providedTitle || '').trim();
  if (trimmed) return trimmed;
  if (!originalName) return 'Untitled Lesson';
  return originalName.replace(/\.[^/.]+$/, '');
};

const MAX_PAGES = 50;

const extractLessonText = async (file) => {
  const { mimetype, path: filePath } = file;
  const buffer = await fs.readFile(filePath);

  if (mimetype === 'application/pdf') {
    const pdfData = await pdfParse(buffer);
    const pageCount = pdfData.numpages || pdfData.numrender || 0;
    if (pageCount > MAX_PAGES) {
      throw new CustomError(`PDF must be ${MAX_PAGES} pages or fewer`, 400);
    }
    const text = (pdfData.text || '').trim();
    if (!text) throw new CustomError('Could not extract text from PDF', 400);
    return { text, pageCount };
  }

  if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const { value } = await mammoth.extractRawText({ buffer });
    const text = (value || '').trim();
    if (!text) throw new CustomError('Could not extract text from DOCX', 400);
    return { text, pageCount: undefined };
  }

  if (mimetype === 'text/plain') {
    const text = buffer.toString('utf8').trim();
    if (!text) throw new CustomError('Text file is empty', 400);
    return { text, pageCount: undefined };
  }

  throw new CustomError('Unsupported file type', 400);
};

export const uploadLesson = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new CustomError('File is required', 400);
  }

  const { text, pageCount } = await extractLessonText(req.file);
  const uploadResult = await uploadToCloudinary(req.file.path);

  const lesson = await Lesson.create({
    title: deriveTitle(req.body.title, req.file.originalname),
    originalName: req.file.originalname,
    fileUrl: uploadResult.secure_url,
    fileType: req.file.mimetype,
    fileSize: req.file.size,
    owner: req.user.id,
    cloudinaryPublicId: uploadResult.public_id,
    extractedText: text,
    pageCount,
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
  await Flashcard.deleteMany({ lesson: lesson._id });

  return res.status(200).json({
    success: true,
    message: 'Lesson deleted successfully',
    data: null,
  });
});
