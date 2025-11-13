import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { updateProfile, changePassword, deleteAccount } from '../controllers/userController.js';
import {
  updateProfileValidator,
  changePasswordValidator,
} from '../utils/validators/userValidator.js';

const router = express.Router();

router.use(protect);

router.patch('/update', updateProfileValidator, validateRequest, updateProfile);
router.patch('/change-password', changePasswordValidator, validateRequest, changePassword);
router.delete('/delete', deleteAccount);

export default router;
