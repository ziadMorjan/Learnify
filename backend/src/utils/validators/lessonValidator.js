import { body, param } from 'express-validator';

const allowedMimeTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const uploadLessonValidator = [
  body('file').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is required');
    }

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      throw new Error('File must be a pdf, docx, or txt');
    }

    if (req.file.size > MAX_FILE_SIZE) {
      throw new Error('File must be 10MB or smaller');
    }

    return true;
  }),
  body('title')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title cannot be empty'),
];

export const getLessonValidator = [
  param('id').isMongoId().withMessage('Invalid lesson id'),
];

export const deleteLessonValidator = [
  param('id').isMongoId().withMessage('Invalid lesson id'),
];
