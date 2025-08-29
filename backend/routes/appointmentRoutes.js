import express from 'express';
import {
  createRazorpayOrder,
  verifyPayment,
  getUserAppointments,
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/my-appointments', protect, getUserAppointments);

export default router;