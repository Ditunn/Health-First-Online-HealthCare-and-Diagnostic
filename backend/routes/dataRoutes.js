import express from 'express';
import {
  getDepartments,
  getDoctorsByDepartment,
  getDoctorById,
} from '../controllers/dataController.js';

const router = express.Router();

router.get('/departments', getDepartments);
router.get('/departments/:id/doctors', getDoctorsByDepartment);
router.get('/doctors/:id', getDoctorById);

export default router;