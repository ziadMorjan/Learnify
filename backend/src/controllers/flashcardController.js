import Flashcard from '../models/Flashcard.js';
import Lesson from '../models/Lesson.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import { generateFlashcardsFromText } from '../utils/gemini.js';


const ensureLessonOwnership = async (lessonId, userId) => {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
        throw new CustomError('Lesson not found', 404);
    }
    if (lesson.owner.toString() !== userId.toString()) {
        throw new CustomError('You are not authorized to access this lesson', 403);
    }
    return lesson;
};

export const listFlashcardsByLesson = asyncHandler(async (req, res) => {
    const { lessonId } = req.params;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 50);
    const skip = (page - 1) * limit;

    await ensureLessonOwnership(lessonId, req.user.id);

    const [flashcards, total] = await Promise.all([
        Flashcard.find({ lesson: lessonId, owner: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Flashcard.countDocuments({ lesson: lessonId, owner: req.user.id }),
    ]);

    res.status(200).json({
        success: true,
        message: 'Flashcards fetched successfully',
        data: {
            flashcards
        },
    });
});

export const updateFlashcard = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
        throw new CustomError('Flashcard not found', 404);
    }
    if (flashcard.owner.toString() !== req.user.id.toString()) {
        throw new CustomError('You are not authorized to update this flashcard', 403);
    }

    if (question !== undefined) {
        flashcard.question = question.trim();
    }
    if (answer !== undefined) {
        flashcard.answer = answer.trim();
    }
    await flashcard.save();

    res.status(200).json({
        success: true,
        message: 'Flashcard updated successfully',
        data: { flashcard },
    });
});

export const deleteFlashcard = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
        throw new CustomError('Flashcard not found', 404);
    }
    if (flashcard.owner.toString() !== req.user.id.toString()) {
        throw new CustomError('You are not authorized to delete this flashcard', 403);
    }

    await flashcard.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Flashcard deleted successfully',
        data: null,
    });
});

export const generateFlashcards = asyncHandler(async (req, res) => {
    const { lessonId, count = 10 } = req.body;
    const lesson = await ensureLessonOwnership(lessonId, req.user.id);

    if (!lesson.extractedText) {
        throw new CustomError('No extracted text found for this lesson. Re-upload the file.', 400);
    }

    const generated = await generateFlashcardsFromText({
        text: lesson.extractedText,
        count,
    });

    if (!generated.length) {
        throw new CustomError('No flashcards to create', 400);
    }
    const toCreate = generated.map((flashcard) => ({
        ...flashcard,
        lesson: lessonId,
        owner: req.user.id,
    }));
    await Flashcard.deleteMany({ lesson: lessonId, owner: req.user.id });
    const flashcards = await Flashcard.create(toCreate);
    res.status(201).json({
        success: true,
        message: 'Flashcards generated successfully',
        data: { flashcards },
    });
});
