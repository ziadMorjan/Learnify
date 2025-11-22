import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
    deleteFlashcard,
    generateFlashcards,
    listFlashcardsByLesson,
    updateFlashcard,
} from '../controllers/flashcardController.js';
import {
    deleteFlashcardValidator,
    generateFlashcardsValidator,
    listFlashcardsValidator,
    updateFlashcardValidator,
} from '../utils/validators/flashcardValidator.js';

const router = express.Router();

router.use(protect);

router.post('/generate', generateFlashcardsValidator, validateRequest, generateFlashcards);
router.get('/:lessonId', listFlashcardsValidator, validateRequest, listFlashcardsByLesson);
router.patch('/:id', updateFlashcardValidator, validateRequest, updateFlashcard);
router.delete('/:id', deleteFlashcardValidator, validateRequest, deleteFlashcard);

export default router;
