import { body, param, query } from 'express-validator';

const textField = (field) =>
    body(field)
        .notEmpty()
        .withMessage(`${field} is required`)
        .isString()
        .trim()
        .isLength({ max: 500 })
        .withMessage(`${field} must be at most 500 characters`);

export const listFlashcardsValidator = [
    param('lessonId').isMongoId().withMessage('Invalid lesson id'),
    query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('limit must be between 1 and 50'),
];

export const updateFlashcardValidator = [
    param('id').isMongoId().withMessage('Invalid flashcard id'),
    body('question')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('question must be between 1 and 500 characters'),
    body('answer')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('answer must be between 1 and 500 characters'),
    body().custom((value, { req }) => {
        if (req.body.question === undefined && req.body.answer === undefined) {
            throw new Error('At least one field (question or answer) must be provided');
        }
        return true;
    }),
];

export const deleteFlashcardValidator = [param('id').isMongoId().withMessage('Invalid flashcard id')];

export const generateFlashcardsValidator = [
    body('lessonId').isMongoId().withMessage('Invalid lesson id'),
    body('count')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('count must be between 1 and 10'),
];
