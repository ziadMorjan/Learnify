import express from 'express';
import multer from 'multer';
import os from 'os';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  uploadLesson,
  getMyLessons,
  getLesson,
  deleteLesson,
} from '../controllers/lessonController.js';
import {
  uploadLessonValidator,
  getLessonValidator,
  deleteLessonValidator,
} from '../utils/validators/lessonValidator.js';

const router = express.Router();

const upload = multer({
  dest: os.tmpdir(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.use(protect);

router.post('/', upload.single('file'), uploadLessonValidator, validateRequest, uploadLesson);

router.get('/', getMyLessons);

router.get('/:id', getLessonValidator, validateRequest, getLesson);

router.delete('/:id', deleteLessonValidator, validateRequest, deleteLesson);

export default router;
