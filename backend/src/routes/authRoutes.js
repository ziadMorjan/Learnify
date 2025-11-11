import express from 'express';
import {
    registerUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword,
    logoutUser,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
    registerValidator,
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
} from '../utils/validators/authValidator.js';

const router = express.Router();

router.post('/register', registerValidator, validateRequest, registerUser);
router.post('/login', loginValidator, validateRequest, loginUser);
router.get('/logout', protect, logoutUser);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPasswordValidator, validateRequest, forgotPassword);
router.post('/reset-password/:token', resetPasswordValidator, validateRequest, resetPassword);

export default router;
